import {NgModule}      from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent}  from './app.component';
import {EditorComponent} from './editor.component';
import {MarkdownService} from './markdown.service';
import {CaretService} from './caret.service';

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
        CaretService
    ],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule {
}
