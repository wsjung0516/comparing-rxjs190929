import { Component, OnInit } from '@angular/core';
import {Hotkeys} from './hotkeys.service';
import {take} from 'rxjs/operators';

@Component({
  selector: 'app-short-key',
  template: `
    <hello name="{{ name }}"></hello>
  `,
  styles: []
})
export class ShortKeyComponent implements OnInit {

  name = 'Angular';

  constructor(private hotkeys: Hotkeys) {
    hotkeys.addShortcut({ keys: 'shift.z', description: 'Add Widget' }).pipe(take(2)).subscribe(console.log);

    hotkeys.addShortcut({ keys: 'ArrowUp', description: 'Open Settings' }).subscribe(this.log);
  }

  log($event) {
    console.log($event)
  }

  ngOnInit() {
  }

}
