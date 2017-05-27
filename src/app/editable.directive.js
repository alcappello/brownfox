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
var EditableDirective = (function () {
    function EditableDirective(elRef) {
        this.elRef = elRef;
        this.update = new core_1.EventEmitter();
    }
    EditableDirective.prototype.ngOnChanges = function (changes) {
        if (changes['model'] && changes['model'].currentValue !== this.lastViewModel) {
            this.lastViewModel = this.model;
            this.refreshView();
        }
    };
    EditableDirective.prototype.onKeyup = function (event) {
        var value = this.elRef.nativeElement.innerHTML;
        this.lastViewModel = value;
        this.update.emit(value);
    };
    EditableDirective.prototype.refreshView = function () {
        this.elRef.nativeElement.innerHTML = this.model;
    };
    return EditableDirective;
}());
__decorate([
    core_1.Input('bf-editable'),
    __metadata("design:type", String)
], EditableDirective.prototype, "model", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], EditableDirective.prototype, "update", void 0);
EditableDirective = __decorate([
    core_1.Directive({
        selector: '[bf-editable]',
        host: {
            '(keyup)': 'onKeyup($event)'
        }
    }),
    __metadata("design:paramtypes", [core_1.ElementRef])
], EditableDirective);
exports.EditableDirective = EditableDirective;
//# sourceMappingURL=editable.directive.js.map