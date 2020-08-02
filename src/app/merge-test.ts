import {Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {from, fromEvent, merge, Observable, Subject} from 'rxjs';
import {map, mapTo, scan, startWith, takeUntil, tap} from 'rxjs/operators';

@Component({
  selector: 'mo-v-toolbox2',
  template: `
    <div class="container">
      <div style="display:flex; flex-direction:row; flex-wrap:nowrap; justify-content: flex-start; overflow:hidden;">
        <div class="nodule-toolbox" >
          <i class="fa fa-tachometer fa-sm icon-position" id="icon_toolbox2" title="show off calcification nodule"></i>
          <div id="lungRADs1" class="toolbox_icon text-width"> 1 </div>|
          <div id="lungRADs2" class="toolbox_icon text-width"> 2 </div>|
          <div id="lungRADs3" class="toolbox_icon text-width"> 3 </div>|
          <div id="top_six" class="toolbox_icon"> Top-6 </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .nodule-toolbox {
      display: flex;
      flex-direction: row;
      flex-wrap: nowrap;
      justify-content: flex-start;
      align-content: stretch;
      align-items: flex-start;
      padding: 2px 2px 2px 8px;

      align-self: stretch;
      flex: 0 0 auto;
    }
    .toolbox_icon {
      font-size: 0.9em;
      color:#9ea3a8;
      padding-left: 3px;
      padding-right: 3px;
      cursor: pointer;

    }
    .text-width {
      width: 20px;
      text-align: center;
    }
    .nodule-list-option-selected {
      color:whitesmoke;
    }
    .nodule-toolbox-icon-activated {
      color: red;
      /*color: whitesmoke;*/
    }
    .nodule-toolbox-icon-deactivated {
      color: #6a6d71;
    }
    .icon-position {
      position:relative;
      top:5px;
      left: 5px;
      width:22px;
      height:22px;
    }

  `]
})
export class VToolbox2Component implements OnInit, OnDestroy {
  toolbox2$: Observable<any>;
  lungRADs1$: Observable<any>;
  lungRADs2$: Observable<any>;
  lungRADs3$: Observable<any>;
  top6$: Observable<any>;
  unsubscribe$ = new Subject();
  @Output() sortNodule = new EventEmitter()
  constructor() { }
  elements: Element[] = [];
  ngOnInit() {
    this.offCalcification();
  }
  offCalcification(){
    const toolbox2 = document.getElementById('icon_toolbox2');
    this.elements[0] = document.getElementById('lungRADs1');
    this.elements[1] = document.getElementById('lungRADs2');
    this.elements[2] = document.getElementById('lungRADs3');
    //
    const top6 = document.getElementById('top_six');
    this.toolbox2$ = fromEvent<KeyboardEvent>(toolbox2, 'click');
    this.lungRADs1$ = fromEvent<KeyboardEvent>(this.elements[0], 'click');
    this.lungRADs2$ = fromEvent<KeyboardEvent>(this.elements[1], 'click');
    this.lungRADs3$ = fromEvent<KeyboardEvent>(this.elements[2], 'click');
    this.top6$ = fromEvent<KeyboardEvent>(top6, 'click');

    this.toolbox2$.pipe(
      mapTo(true),
      startWith(false),
      scan(value => !value ),
      takeUntil(this.unsubscribe$),
    ).subscribe(value => {
      // console.log('show-->', value);
      if ( value) toolbox2.classList.add('nodule-toolbox-icon-activated');
      else toolbox2.classList.remove('nodule-toolbox-icon-activated');
    });
    /** Display nodule list that has over value to one of the restricted level of LungRADs*/

    let tarr = [false, false, false];

    const RADs1$ = this.lungRADs1$.pipe(
      mapTo(0),
      takeUntil(this.unsubscribe$),
    );
    const RADs2$ = this.lungRADs2$.pipe(
      mapTo(1),
      takeUntil(this.unsubscribe$),
    );
    const RADs3$ = this.lungRADs3$.pipe(
      mapTo(2),
      takeUntil(this.unsubscribe$),
    );
    merge(RADs1$, RADs2$, RADs3$).pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe(value => {

      if( tarr[value] === true) {
        tarr[value] = false;
        this.elements.map( (el) => {
          el.classList.remove('nodule-toolbox-icon-activated')
        })
      } else {
        this.elements.
          map( ( el, index) => {
            if( value === index ) {
              el.classList.add('nodule-toolbox-icon-activated')
              tarr[index] = true;
            } else {
              el.classList.remove('nodule-toolbox-icon-activated')
              tarr[index] = false;
            }
        });

      }
      console.log('lungLADs-->', value, tarr);

      // this.store.dispatch(new SetToolEnableStatus({lungLADs: ''}));
    });



  }
  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
