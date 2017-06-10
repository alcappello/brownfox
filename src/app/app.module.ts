import {NgModule}      from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent}  from './components/app.c';
import {EditorComponent} from './components/editor.c';
import {MarkdownService} from './services/markdown.s';
import {CaretService} from './services/caret.s';
import {UndoService} from './services/undo.s';

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
