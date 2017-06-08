import {NgModule}      from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent}  from './app.component';
import {EditorComponent} from './editor.component';
import {MarkdownService} from './markdown.service';
import {CaretService} from './caret.service';
import {UndoService} from './undo.service';

@NgModule({
    imports: [
        BrowserModule
    ],
    declarations: [
        AppComponent,
        EditorComponent
    ],
    providers: [
        MarkdownService,
        CaretService,
        UndoService
    ],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule {
}
