import {Injectable} from '@angular/core';


@Injectable()
export class UndoService {
    private history: string[] = [];
    private counter = 0;

    public push(item: string): void {
        this.history.push(item);
        this.counter ++;
    }

    public undo(): string | null {

        if (this.counter === 1) {
            return null;
        }

        this.counter --;
        return this.history[this.counter];
    }

    public redo(): string | null {

        if (this.counter === this.history.length - 1) {
            return null;
        }

        this.counter ++;
        return this.history[this.counter];
    }

}
