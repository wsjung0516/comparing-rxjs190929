import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-progress',
  template: `
    <div class="form-group" *ngIf="progress > 0">
      <div class="progress">
        <div class="progress-bar" [style.width.%]="progress">{{progress}}%
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class ProgressComponent implements OnInit {
  @Input() progress = 0;

  constructor() { }

  ngOnInit() {
  }

}
