import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'app-canvas',
  template: `
      <canvas #canvas class="my-canvas"></canvas>

  `,
  styleUrls: ['./canvas.component.css']
})
export class CanvasComponent implements OnInit, AfterViewInit {
  canvas: any;
  ctx: any;
  infiniteX = Infinity;
  infiniteY = Infinity;
  colorHue = 0;
  @ViewChild('canvas', {static: false}) canvasRef: ElementRef;
  constructor() { }

  ngAfterViewInit(): void {
    setTimeout(() => this.initialize());
  }
  ngOnInit() {

  }
  initialize() {
    this.canvas = this.canvasRef.nativeElement;
    this.ctx = this.canvas.getContext('2d');

    this.canvas.width = window.innerWidth - 20;
    this.canvas.height = window.innerHeight - 20;
    this.ctx.lineJoin = 'round';
    this.ctx.lineCap = 'round';
    this.ctx.lineWidth = 10;

  }

   paint({ clientX, clientY }) {
    this.ctx.strokeStyle = `hsl(${this.colorHue}, 100%, 60%)`;
    this.ctx.beginPath();
    if (Math.abs(this.infiniteX - clientX) < 100 && Math.abs(this.infiniteY - clientY) < 100) {
      this.ctx.moveTo(this.infiniteX, this.infiniteY);
    }
    this.ctx.lineTo(clientX, clientY);
    this.ctx.stroke();
    this.infiniteX = clientX;
    this.infiniteY = clientY;
    this.colorHue++;
  }

}
