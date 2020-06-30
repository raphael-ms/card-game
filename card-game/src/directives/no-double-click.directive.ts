import {
    Directive, EventEmitter, HostListener, Input, OnDestroy, OnInit,
    Output
} from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';
import { throttleTime } from 'rxjs/operators';

@Directive({
    selector: '[appPreventDoubleClick]'
})
export class PreventDoubleClickDirective implements OnInit, OnDestroy {
    @Input()
    blockedTime = 3000;

    @Output()
    oneClick = new EventEmitter();

    private clicks = new Subject();
    private subscription: Subscription;

    constructor() { }

    ngOnInit() {
        this.subscription = this.clicks.pipe(
          throttleTime(this.blockedTime)
        ).subscribe(e => this.emitOneClick(e));
      }

      emitOneClick(e) {
        this.oneClick.emit(e);
      }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    @HostListener('click', ['$event'])
    clickEvent(event) {
        console.log('Disparo da diretiva.');
        event.preventDefault();
        event.stopPropagation();
        this.clicks.next(event);
    }
}
