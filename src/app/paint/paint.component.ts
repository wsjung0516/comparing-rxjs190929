import {Component, OnInit, ViewChild} from '@angular/core';
import {fromEvent, Observable} from 'rxjs';
import {mergeMap, takeUntil} from 'rxjs/operators';
import {CanvasComponent} from '../canvas/canvas.component';
import {Router} from '@angular/router';

@Component({
  selector: 'app-paint',
  template: `
    <button type="button" (click)="goHome()"> Home </button>
    <button type="button" (click)="onDraw()"> Draw </button>
    <div style="position: relative; width: 500px; height: 500px; border: 1px dashed skyblue">
        <div style="width: 100%; height: 100%; position: absolute; top: 0px; left: 0px">
              <app-canvas></app-canvas>
        </div>
    </div>
  `,
  styles: []
})
export class PaintComponent implements OnInit {
  @ViewChild(CanvasComponent, {static: false }) CanvasCmp: CanvasComponent;
  constructor( private router: Router) { }
  move$: Observable<any>;
  down$: Observable<any>;
  up$: Observable<any>;
  ngOnInit() {
    this.move$ = fromEvent(document, 'mousemove');
    this.down$ = fromEvent(document, 'mousedown');
    this.up$ = fromEvent(document, 'mouseup');


  }
  goHome() {
    this.router.navigate(['/']);
  }
  onDraw() {
    const paints$ = this.down$.pipe(
      mergeMap(down => this.move$.pipe(takeUntil(this.up$)))
    );
    paints$.subscribe((r: MouseEvent) => {
      // console.log('r-->', r )
      this.CanvasCmp.paint(r);
    });

  }

}
