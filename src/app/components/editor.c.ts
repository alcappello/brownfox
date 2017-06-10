import {Component} from '@angular/core';

import {MarkdownService} from '../services/markdown.s';
import {CaretService} from '../services/caret.s';
import {UndoService} from '../services/undo.s';


@Component({
    selector: 'bf-editor',
    templateUrl: './editor.c.html',
    styleUrls: ['./editor.c.css']
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

        let oldText = elem.innerHTML;
        let newText = this.markdownService.applyMacro(elem, event);

        if (newText !== null && newText !== oldText) {
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
