import {Directive, ElementRef, Input, Output, EventEmitter, SimpleChanges} from '@angular/core';

@Directive({
    selector: '[bf-editable]',
    host: {
        '(keyup)': 'onKeyup($event)'
    }
})

export class EditableDirective {
    @Input('bf-editable') model: string;
    @Output() update = new EventEmitter();

    /**
     * By updating this property on keyup, and checking against it during
     * ngOnChanges, we can rule out change events fired by our own onKeyup.
     */
    private lastViewModel: string;

    constructor(private elRef: ElementRef) {
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes['model'] && changes['model'].currentValue !== this.lastViewModel) {
            this.lastViewModel = this.model;
            this.refreshView();
        }
    }

    onKeyup(event: Event) {
        let value = this.elRef.nativeElement.innerHTML;
        this.lastViewModel = value;
        this.update.emit(value);
    }

    private refreshView() {
        this.elRef.nativeElement.innerHTML = this.model;
    }
}
