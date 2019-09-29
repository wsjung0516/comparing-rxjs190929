import {Component, OnInit, ViewChild} from '@angular/core';
import {fromEvent} from 'rxjs';
import {mergeMap, takeUntil} from 'rxjs/operators';
import {CanvasComponent} from '../canvas/canvas.component';

@Component({
  selector: 'app-paint',
  template: `
    <p>
        <app-canvas></app-canvas>
    </p>
  `,
  styles: []
})
export class PaintComponent implements OnInit {
  @ViewChild(CanvasComponent, {static: false }) CanvasCmp: CanvasComponent;
  constructor() { }

  ngOnInit() {
    const move$ = fromEvent(document, 'mousemove');
    const down$ = fromEvent(document, 'mousedown');
    const up$ = fromEvent(document, 'mouseup');

    const paints$ = down$.pipe(
      mergeMap(down => move$.pipe(takeUntil(up$)))
    );
    paints$.subscribe((r: MouseEvent) => this.CanvasCmp.paint(r));

  }

}
