import {Component, HostBinding, OnInit} from '@angular/core';

@Component({
  selector: "th[resizable]",
  template: `
    <div class="wrapper">
      <div class="content">
        <ng-content></ng-content> <!-- .No-->
      </div>
      <div class="bar" (resizable)="onResize($event)"></div>
    </div>
  `,
  styles: [`
    :host:last-child .bar {
      display: none;
    }

    .wrapper {
      display: flex;
      justify-content: flex-end;
    }

    .content {
      flex: 1;
    }

    .bar {
      position: absolute;
      top: 0;
      bottom: 0;
      width: 2px;
      margin: 0  0 0 16px;
      justify-self: flex-end;
      border-left: 2px solid transparent;
      border-right: 2px solid transparent;
      background: blueviolet;
      background-clip: content-box;
      cursor: ew-resize;
      opacity: 0;
      transition: opacity .3s;
    }

    .bar:hover, .bar:active {
      opacity: 1;
    }

  `]
})
export class ResizableComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  @HostBinding("style.width.px")
  width: number | null = null;

  onResize(width: number) {
    this.width = width;
  }
}
