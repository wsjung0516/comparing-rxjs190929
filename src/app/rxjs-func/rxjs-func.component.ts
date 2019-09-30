import { Component, OnInit } from '@angular/core';
import {animationFrameScheduler, fromEvent, Observable} from 'rxjs';
import {map, subscribeOn, switchMap, takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-rxjs-func',
  templateUrl: './rxjs-func.component.html',
  styleUrls: ['./rxjs-func.component.css']
})
export class RxjsFuncComponent implements OnInit {
  mousemove$: Observable<any>;
  event: Event;
  constructor() {
    this.mousemove$ = fromEvent<MouseEvent>(document, 'mousemove');
  }

  ngOnInit() {
    const box = document.querySelector<HTMLDivElement>('.draggable');

    const mousedown$ = fromEvent<MouseEvent>(box, 'mousedown');
    const mouseup$ = fromEvent<MouseEvent>(box, 'mouseup');

    const drag$ = mousedown$.pipe(
      switchMap(
        (start) => {
          return this.mousemove$.pipe(map(move => {
              move.preventDefault();
              return {
                left: move.clientX - start.offsetX,
                top: move.clientY - start.offsetY
              };
            }),
            takeUntil(mouseup$));
        })
    );

    // const position$ = drag$.pipe(subscribeOn(animationFrameScheduler));

    // position$.subscribe(pos => {
    drag$.subscribe(pos => {
      box.style.top = `${pos.top}px`;
      box.style.left = `${pos.left}px`;
    });

  }
  onDrop(ev) {
    console.log('onDrop', ev);
  }
  allowDrop(ev) {
    console.log('allowDrop', ev);
  }
}
