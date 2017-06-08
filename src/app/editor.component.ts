import {Component} from '@angular/core';

import {MarkdownService} from './markdown.service';
import {CaretService} from './caret.service';
import {UndoService} from './undo.service';


@Component({
    selector: 'bf-editor',
    templateUrl: './editor.component.html',
    styleUrls: ['./editor.component.css']
})

export class EditorComponent {

    constructor(
        private markdownService: MarkdownService,
        private caretService:    CaretService,
        private undoService:     UndoService
    ) {}

    /**
     * On keydown event:
     * - Detect possible macros and apply their effect on the text
     *
     * @param elem
     * @param event
     */
    onKeydown(elem: HTMLDivElement, event: KeyboardEvent) {

        let newText = this.markdownService.applyMacro(elem, event);

        if (newText !== null && newText !== this.text) {
            elem.innerHTML = newText;
            this.caretService.restoreSelection();
            event.preventDefault();
        }
    }


    /**
     * On keyup event:
     * - Save the carets' positions
     * - Transform the innerHTML, apply the correct markup
     * - Restore the carets and save changes on history
     *
     * @param elem
     * @returns {boolean}
     */
    onKeyup(elem: HTMLDivElement) {

        this.caretService.saveSelection();

        let newText = this.markdownService.transform(elem.innerHTML);

        if (newText !== elem.innerHTML) {
            elem.innerHTML = newText;
            this.undoService.push(elem.innerHTML);
        }

        this.caretService.restoreSelection();
    }
}
