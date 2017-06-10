import {Injectable} from '@angular/core';
import {UndoService} from './undo.s';
import {CaretService} from './caret.s';


interface MarkdownRule {
    symbol: string;
    html: string;
    check(text: string, pos: number): boolean;
}

@Injectable ()
export class MarkdownService {
    rules: MarkdownRule[];

    private purge(text: string): string {

        return text.replace(/<[\/]?(span|strong|bold-macro)>/g, '');
    }

    constructor(private undoService: UndoService,
                private caretService: CaretService) {}

    public transform(text: string): string {

        text = this.purge(text);
        text = text.replace(/[*](\S[^(*)]*\S|\S)[*]/g, '<span>*</span><strong>$1</strong><span>*</span>');
        return text;
    }


    public applyMacro(elem: HTMLDivElement, event: KeyboardEvent): string | null {

        // If it's a Mac, use the command key as function key, otherwise use ctrl
        let meta = (navigator.platform.toLowerCase() === 'macintel') ? event.metaKey : event.ctrlKey;

        // BOLD MACRO (CMD + B)
        if (meta && !event.shiftKey && event.key === 'b') {
            this.caretService.saveSelection();

            CaretService.insertMacroTag('bold-macro', '', false, true);
            let boldTags = document.getElementsByTagName('bold-macro');

            for (let i = 0; i < boldTags.length; i++) {
                boldTags[i].innerHTML = '*';
            }


            return elem.innerHTML;
        }

        // UNDO (CMD + Z)
        if (meta && !event.shiftKey && event.key === 'z') {
            let newText = this.undoService.undo();
            if (newText) {
                return newText;
            }

        // REDO (CMD + Shift + Z)
        } else if (meta && event.shiftKey && event.key === 'z') {
            let newText = this.undoService.redo();
            if (newText) {
                return newText;
            }
        }

        return null;
    }


}

