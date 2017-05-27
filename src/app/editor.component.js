"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var EditorComponent = (function () {
    function EditorComponent() {
    }
    EditorComponent.prototype.onUpdate = function (text, elem) {
        this.text = text;
    };
    EditorComponent.prototype.onKeyup = function (event) {
        if (event.key === 't') {
            var pos = window.getSelection().getRangeAt(0);
            console.log(pos, event);
        }
    };
    return EditorComponent;
}());
EditorComponent = __decorate([
    core_1.Component({
        selector: 'bf-editor',
        templateUrl: './editor.component.html',
        styleUrls: ['./editor.component.css']
    })
], EditorComponent);
exports.EditorComponent = EditorComponent;
//# sourceMappingURL=editor.component.js.map