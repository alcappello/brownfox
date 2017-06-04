import {Component} from '@angular/core';
import {MarkdownService} from './markdown.service';
import {CaretService} from './caret.service';


@Component({
    selector: 'bf-editor',
    templateUrl: './editor.component.html',
    styleUrls: ['./editor.component.css']
})

export class EditorComponent {
    text: string;

    constructor(
        private markdownService: MarkdownService,
        private caretService:    CaretService) {
    }

    onKeydown(elem: HTMLDivElement, event: KeyboardEvent) {

    }



    onKeyup(elem: HTMLDivElement, event: KeyboardEvent) {

        this.caretService.saveSelection();
        elem.innerHTML = this.markdownService.transform(elem.innerHTML);
        this.caretService.restoreSelection();
        this.text = elem.innerHTML;

    }
}
