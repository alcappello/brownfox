import {NgModule}      from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent}  from './app.component';
import {EditorComponent} from './editor.component';
import {EditableDirective} from './editable.directive';

@NgModule({
    imports: [
        BrowserModule
    ],
    declarations: [
        AppComponent,
        EditorComponent,
        EditableDirective
    ],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule {
}
