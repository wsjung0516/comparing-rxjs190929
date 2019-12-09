import {Component, OnDestroy, OnInit} from '@angular/core';
import {concat, EMPTY, interval, merge, Observable, of, Subject, Subscription, timer} from 'rxjs';
import {concatMap, delay, map, mapTo, mergeMap, repeat, scan, startWith, switchMap, take, takeUntil, tap} from 'rxjs/operators';
import {untilDestroyed} from 'ngx-take-until-destroy';

@Component({
  selector: 'app-play-pause',
  template: `
    <div style="width: 1000px" fxLayout="row" fxLayoutAlign="left center" fxLayoutGap="5px">
      <button mat-raised-button color="primary" (click)="keyDown$.next(-1)">Key Down(Auto Up)</button>
      <button mat-raised-button color="primary" (click)="keyUp$.next(1)">Key Up(Auto Down)</button>
      <button mat-raised-button color="basic" (click)="keyLeft$.next(1)">Key Left(Speed Down)</button>
      <button mat-raised-button color="basic" (click)="keyRight$.next(-1)">Key Right(Speed Up)</button>
      <button mat-raised-button color="warn" (click)="onStopOrResume()">Key Space(Stop/Pause)</button>
      <!--      <button mat-button color="primary" (click)="keyDown$.next()">Key Down</button>-->
    </div>
  `,
  styles: []
})
export class PlayPauseComponent implements OnInit, OnDestroy {
  keyDown$ = new Subject<number>();
  keyUp$ = new Subject<number>();
  keyLeft$ = new Subject();
  keyRight$ = new Subject();
  keySpace$ = new Subject<number>();
  interval$ = new Subject();
  //
  keyValue;
  oldState = 0;
  lastState = false;
  curIdx: any = 5;
  interval;
  speed = [300, 500, 700, 1000, 1500, 2000, 2500, 3000, 4000, 5000];
  constructor() { }

  ngOnInit() {
    this.newSpeed();
    merge( this.keyUp$, this.keyDown$, this.keySpace$)
      .pipe( untilDestroyed(this) ).subscribe( value => this.keyValue = value);
    //
    merge( this.keyLeft$, this.keyRight$).pipe(
        untilDestroyed(this),
        startWith(1)
      ).subscribe(  _=> this.newInterval());
    //
    this.interval$.pipe(
      map( _ => this.keyValue ),
      untilDestroyed(this),
    ).subscribe( value => console.log('result', value))
  }
  //
  newInterval() {
    if ( this.interval ) clearInterval( this.interval);
    return this.interval = setInterval(() => { this.interval$.next(); }, this.speed[this.curIdx]);
  }
  newSpeed() {
    return merge( this.keyLeft$, this.keyRight$)
      .pipe(
        untilDestroyed(this),
        map( value => {
          this.curIdx = this.curIdx + value;
          if( this.curIdx >= this.speed.length) this.curIdx = this.speed.length -1;
          if( this.curIdx < 0 ) this.curIdx = 0;
          console.log('interval', this.speed[this.curIdx]);
          return this.speed[this.curIdx];

        }),
        startWith(1000)
      ).subscribe();
  }
  onStopOrResume() {
    // console.log('this.currentState', this.currentState, this.lastState);
    this.lastState = !this.lastState;
    /** When called this function from KyeUp, keyDown, then need to change state*/
    if( this.keyValue !== 0) this.lastState = true;
    //
    if( this.lastState ) {
      this.oldState = this.keyValue;
      this.keyValue = 0;
    } else {
      this.keyValue = this.oldState;
    }
    //
    this.keySpace$.next(this.keyValue);
  }
  ngOnDestroy(): void {
    if ( this.interval ) clearInterval( this.interval);
  }
}
