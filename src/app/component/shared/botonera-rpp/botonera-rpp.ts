import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'app-botonera-rpp',
    imports: [],
    templateUrl: './botonera-rpp.html',
    styleUrl: './botonera-rpp.css',
})
export class BotoneraRpp {

    @Input() numRpp: number = 5;
    @Input() options: number[] = [5, 10, 20, 50];
    @Output() rppChange = new EventEmitter<number>();

    setRpp(n: number) {
        this.numRpp = n;
        this.rppChange.emit(this.numRpp);
        return false;
    }

}
