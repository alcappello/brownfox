import {NgModule}      from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent}  from './app.component';
import {EditorComponent} from './editor.component';
import {MarkdownService} from './markdown.service';

@NgModule({
    imports: [
        BrowserModule
    ],
    declarations: [
        AppComponent,
        EditorComponent
    ],
    providers: [
        MarkdownService
    ],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule {
}
