import {Component} from '@angular/core';
import {MarkdownService} from './markdown.service';

@Component({
    selector: 'bf-editor',
    templateUrl: './editor.component.html',
    styleUrls: ['./editor.component.css']
})

export class EditorComponent {
    text: string;

    private setCaret(el: Node, pos: number) {

        // Loop through all child nodes
        for (let index = 0; index < el.childNodes.length; index++) {
            let node = el.childNodes[index];
            if (node.nodeType === 3) { // we have a text node
                if (node.textContent.length >= pos) {
                    // finally add our range
                    let range = document.createRange(),
                        sel = window.getSelection();
                    range.setStart(node, pos);
                    range.collapse(true);
                    sel.removeAllRanges();
                    sel.addRange(range);
                    return -1; // we are done
                } else {
                    pos -= node.textContent.length;
                }
            } else {
                pos = this.setCaret(node, pos);
                if (pos === -1) {
                    return -1; // no need to finish the for loop
                }
            }
        }
        return pos; // needed because of recursion stuff
    }


    constructor(private markdownService: MarkdownService) {
    }

    onKeyup(elem: HTMLDivElement) {
        this.text = elem.innerHTML;

        let newText = this.markdownService.transform(this.text);

        if (newText !== elem.innerHTML) {

            elem.innerHTML = newText;
            // Rangy.restoreSelection();
            this.text = newText;
        }
    }


}
