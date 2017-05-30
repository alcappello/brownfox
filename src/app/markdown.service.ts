import {Injectable} from '@angular/core';


interface MarkdownRule {
    symbol: string;
    html: string;
    check(text: string, pos: number): boolean;
}

@Injectable ()
export class MarkdownService {
    rules: MarkdownRule[];

    private purge(text: string): string {

        return text.replace(/<[\/]?(span|strong)>/g, '');
    }

    public transform(text: string): string {

        text = this.purge(text);
        text = text.replace(/[*](\S[^*<]*\S|\S)[*]/g, '<span>*</span><strong>$1</strong><span>*</span>');

        return text;
    }


}

