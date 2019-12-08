import {Component, OnDestroy, OnInit} from '@angular/core';
import {concat, EMPTY, interval, merge, Observable, of, Subject, Subscription, timer} from 'rxjs';
import {concatMap, delay, map, mapTo, mergeMap, repeat, scan, startWith, switchMap, take, takeUntil, tap} from 'rxjs/operators';
import {untilDestroyed} from 'ngx-take-until-destroy';

@Component({
  selector: 'app-play-pause',
  template: `
    <div style="width: 1000px" fxLayout="row" fxLayoutAlign="space-between center">
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
  currentState;
  oldState = 0;
  lastState = false;
  currentSpeed: any = 1 ;
  baseSpeed = 500;
  curIdx = 5;
  speed = [300,500,700,1000,1500,2000,2500,3000,4000,5000];
  timer$: Observable<any>;
  constructor() { }

  ngOnInit() {
         // this.baseSpeed = this.baseSpeed * this.currentSpeed;
    this.curIdx = this.curIdx + this.currentSpeed;
    if( this.curIdx > this.speed.length) this.curIdx = this.speed.length -1;
    if( this.curIdx < 0 ) this.curIdx = 0;
    //
    this.newSpeed();

    // let timer1$ = timer(0, 200);
    // let timer2$ = timer(0, 300);
    // let timer3$ = timer(0, 500);
    // let timer4$ = timer(0, 800);
    // let timer5$ = timer(0, 1000);
    // let timer6$ = timer(0, 2000);
    // let timer7$ = timer(0, 3000);
   // let timer$ = timer(0, 500 * this.currentSpeed);
    //interval(500 * this.currentSpeed)
    if( this.timer$ )this.timer$.pipe().subscribe();
    this.newTimer().subscribe( val => console.log('timer', val));
    //
    merge( this.keyUp$, this.keyDown$, this.keySpace$)
      .pipe( untilDestroyed(this) ).subscribe( value => this.currentState = value);
    //
    merge( this.keyLeft$, this.keyRight$)
      .pipe( untilDestroyed(this),
        startWith(1)
      )
      .subscribe( value => {
         this.currentSpeed = value;
         console.log('currentSpeed', this.currentSpeed);
    });
    //
/*
    timer$.pipe(
      map( _ => this.currentState ),
      untilDestroyed(this),
    ).subscribe( value => console.log('result', value))
*/


  }
  newTimer() {
    return this.timer$ = timer(0, this.speed[this.curIdx]).pipe();
  }
  newSpeed() {
    return merge( this.keyLeft$, this.keyRight$)
      .pipe(
        untilDestroyed(this),
        map( value => {
          this.curIdx = this.curIdx + (+value);
          if( this.curIdx > this.speed.length) this.curIdx = this.speed.length -1;
          if( this.curIdx < 0 ) this.curIdx = 0;
          console.log('this.curIdx', this.curIdx);
          return this.speed[this.curIdx];

        }),
        startWith(1000)
      ).subscribe();
  }
  onStopOrResume() {
    // console.log('this.currentState', this.currentState, this.lastState);
    this.lastState = !this.lastState;
    /** When called this function from KyeUp, keyDown, then need to change state*/
    if( this.currentState !== 0) this.lastState = true;
    //
    if( this.lastState ) {
      this.oldState = this.currentState;
      this.currentState = 0;
    } else {
      this.currentState = this.oldState;
    }
    //
    this.keySpace$.next(this.currentState);
  }
  ngOnDestroy(): void {
  }
}
