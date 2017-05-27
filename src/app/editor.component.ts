import {Component} from '@angular/core';

@Component({
    selector: 'bf-editor',
    templateUrl: './editor.component.html',
    styleUrls: ['./editor.component.css']
})

export class EditorComponent {
    text: string;

    onUpdate(text: string, elem: Element) {
        this.text = text;
    }

    onKeyup(event: KeyboardEvent) {
        if (event.key === 't') {
            let pos = window.getSelection().getRangeAt(0);
            console.log(pos, event);
        }
    }
}
