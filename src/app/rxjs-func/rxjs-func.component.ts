import { Component, OnInit } from '@angular/core';
import {animationFrameScheduler, forkJoin, fromEvent, Observable, of, zip} from 'rxjs';
import {map, subscribeOn, switchMap, take, takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-rxjs-func',
  templateUrl: './rxjs-func.component.html',
  styleUrls: ['./rxjs-func.component.css']
})
export class RxjsFuncComponent implements OnInit {
  mousemove$: Observable<any>;
  event: Event;
  currentDroppable = null;

  constructor() {
  }

  ngOnInit() {
    const box = document.querySelector<HTMLDivElement>('.draggable');
    this.mousemove$ = fromEvent<MouseEvent>(document, 'mousemove');
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
    drag$.subscribe(pos => {
      this.checkIsDropArea( pos);
      box.style.top = `${pos.top}px`;
      box.style.left = `${pos.left}px`;
    });
  }
  checkIsDropArea( pos ) {
    // const val = {...pos};
    console.log('x,y-->', pos);
    const y = Number(pos.top);
    const x = Number(pos.left);
    const elemBelow = document.elementFromPoint( x, y);
    const droppableBelow = !!elemBelow && elemBelow.closest('.droppable');
    if (this.currentDroppable !== droppableBelow) {
      if (this.currentDroppable) { // null when we were not over a droppable before this event
        this.leaveDroppable(this.currentDroppable);
        this.currentDroppable = droppableBelow;
        return;
      }
      this.currentDroppable = droppableBelow;
      if (this.currentDroppable) { // null if we're not coming over a droppable now
        // (maybe just left the droppable)
        this.enterDroppable(this.currentDroppable);
      }
    }
  }
  enterDroppable(elem) {
    elem.style.backgroundColor = 'pink';
  }

  leaveDroppable(elem) {
    elem.style.background = '';
  }
}
