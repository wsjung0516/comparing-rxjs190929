import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  DoCheck,
  ElementRef, Host,
  HostListener,
  NgZone,
  OnInit, Self,
  ViewChild
} from '@angular/core';

@Component({
  selector: 'app-slider-test',
  template: `
    <div style="position: relative;top:100px;left: 100px;width: 200px">
      <div style="display: flex;justify-content: space-around">
        <div>
          <mat-button-toggle-group >
            <mat-button-toggle id="ruler">
              <img width="20" style="color: gray" #rull src="{{getImageUrl}}" alt="">
            </mat-button-toggle>
            <mat-button-toggle ><i class="fa fa-home "></i></mat-button-toggle>
            <mat-button-toggle ><i class="fa fa-home "></i></mat-button-toggle>
          </mat-button-toggle-group>
        </div>
        <div>
          <mat-button-toggle style="position: relative;left: 5px" ><i class="fa fa-home "></i></mat-button-toggle>
        </div>
      </div>
      <mat-slider
        min="1"
        max="100"
        step="0.5"
        value="50"
        (input)="onInput($event)"
        (change)="onChange($event)"
      ></mat-slider>
      <div style="position: relative;top:50px; width: 200px;height: 50px;background: yellowgreen">
        <mat-slider
          min="1"
          max="100"
          step="0.5"
          value="50"
          (input)="onInput($event)"
          (change)="onChange($event)"
        ></mat-slider>

        <div #dummy_tag id="dummy_tag" (click)="onClick($event)"></div>
      </div>
    </div>
  `,
  styles: [`
  .mat-button-toggle-label-content{
    line-height: 38px;
    width: 40px;
    padding: 0px;
    margin: 0px;
  }

  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SliderTestComponent implements OnInit, AfterViewInit, DoCheck {
  el:Element;
  // ruler: Element
  imageUrl = "assets/lucas/RULER-released.png";
  imageUrl2 = "assets/lucas/RULER-pressed0.png";
  @ViewChild('ruler', {static: false}) ruler: ElementRef;
  @ViewChild('dummy_tag',{static: false}) dummyTag: ElementRef;

  @HostListener('keydown', ['$event']) onKeyDown(e) {
     this.simulateMouseClick(this.el);
     // this.dummyTag.nativeElement.click();
  }
  constructor( @Host() private ngZone: NgZone) { }

  ngOnInit() {

    this.el = document.getElementById('dummy_tag');


  }
  ngDoCheck(): void {
  }
  get getImageUrl() {
    let ret;
    const rul = document.getElementById("ruler")
    // console.log('rul', rul, rul.classList);
    if( rul.classList.contains('mat-button-toggle-checked')) {
      return  "assets/lucas/RULER-pressed0.png";
    } else {
      return  "assets/lucas/RULER-released.png";

    }


  }
  ngAfterViewInit(): void {
  }

  onInput(event) {

  }
  onChange(event) {

  }
  onClick(event) {
    console.log('event-->',event);
  }
  simulateMouseClick(targetNode) {
    function triggerMouseEvent(targetNode, eventType) {
      var clickEvent = document.createEvent('MouseEvents');
      clickEvent.initEvent(eventType, true, true);
      targetNode.dispatchEvent(clickEvent);
    }

    triggerMouseEvent(targetNode, "click");
  }
}
