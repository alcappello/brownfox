import {Injectable} from '@angular/core';
import {nodeValue} from '@angular/core/src/view';

@Injectable()
export class CaretService {
    private caretID: string = 'allyourcarets';

    /**
     * Set the caret to a given position inside a given element
     * @param el
     * @param pos
     * @returns {number} needed because of recursion
     */
    public setCaret(el: Node, pos: number): number {

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
        return pos;
    }

    /**
     * Saves the current carets by adding a data tag
     */
    public saveSelection(): void {

        let sel = window.getSelection(),
            range: Range,
            node: HTMLElement;

        for (let i = 0; i < sel.rangeCount; ++i) {

            range = sel.getRangeAt(i);
            node = document.createElement('caret-token');

            node.id = this.caretID + i;

            // when a selection is not collapsed, then a single caret-token is not enough
            if (!range.collapsed) {
                node.setAttribute('selection', 'true');
                // create another range, just to inject another caret-token
                let twinRange = document.createRange();
                twinRange.setStart(range.endContainer, range.endOffset);

                let twinNode = document.createElement('caret-token');
                twinNode.id = this.caretID + i + 'T'; // same ID, with T at the end
                twinRange.insertNode(twinNode);

                twinRange.insertNode(twinNode);
            }

            range.insertNode(node);
        }
    }

    public restoreSelection(): void {

        let tokens = document.getElementsByTagName('caret-token'),
            sel = window.getSelection(),
            range: Range;

        sel.removeAllRanges();

        for (let i in tokens) {
            if (tokens[i].id !== undefined && tokens[i].id.indexOf(this.caretID) === 0 && tokens[i].id.slice(-1) !== 'T') {

                range = document.createRange();
                range.setStart(tokens[i], 0);

                if (tokens[i].getAttribute('selection')) {
                    let twinToken = document.getElementById(tokens[i].id + 'T');
                    range.setEnd(twinToken, 0);

                } else {
                    // Do nothing
                }


                sel.addRange(range);

            }
        }

        // Last thing: remove the tokens
        for (let i = 0; i < tokens.length; i++) {
            tokens[i].remove();
        }
    }
}
