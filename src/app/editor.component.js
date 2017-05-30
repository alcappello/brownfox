"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var markdown_service_1 = require("./markdown.service");
require("rangy");
var EditorComponent = (function () {
    function EditorComponent(markdownService) {
        this.markdownService = markdownService;
    }
    EditorComponent.prototype.setCaret = function (el, pos) {
        // Loop through all child nodes
        for (var index = 0; index < el.childNodes.length; index++) {
            var node = el.childNodes[index];
            if (node.nodeType === 3) {
                if (node.textContent.length >= pos) {
                    // finally add our range
                    var range = document.createRange(), sel = window.getSelection();
                    range.setStart(node, pos);
                    range.collapse(true);
                    sel.removeAllRanges();
                    sel.addRange(range);
                    return -1; // we are done
                }
                else {
                    pos -= node.textContent.length;
                }
            }
            else {
                pos = this.setCaret(node, pos);
                if (pos === -1) {
                    return -1; // no need to finish the for loop
                }
            }
        }
        return pos; // needed because of recursion stuff
    };
    EditorComponent.prototype.onKeyup = function (elem) {
        this.text = elem.innerHTML;
        rangy.getSelection();
        var newText = this.markdownService.transform(this.text);
        if (newText !== elem.innerHTML) {
            elem.innerHTML = newText;
            // Rangy.restoreSelection();
            this.text = newText;
        }
    };
    return EditorComponent;
}());
EditorComponent = __decorate([
    core_1.Component({
        selector: 'bf-editor',
        templateUrl: './editor.component.html',
        styleUrls: ['./editor.component.css']
    }),
    __metadata("design:paramtypes", [markdown_service_1.MarkdownService])
], EditorComponent);
exports.EditorComponent = EditorComponent;
//# sourceMappingURL=editor.component.js.map