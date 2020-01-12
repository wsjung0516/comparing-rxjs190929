import { Component, OnInit } from '@angular/core';
import {ObservableStore} from './observable-store';

@Component({
  selector: 'app-ultimate-subject',
  template: `
    <p>
      ultimate-subject works!
    </p>
  `,
  styles: []
})
export class UltimateSubjectComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    const store = new ObservableStore({
      user: 'Brian',
      isAuthenticated: false
    });
    store.selectState('user').subscribe( console.log);
    store.updateState({
      user: 'Joe'
    });
    store.stateChanges().subscribe(value => {
      console.log( 'subscribe', value);
    });
    setTimeout(() => {
      store.updateState({
        user: 'Kim',
        isAuthenticated: true
      })
      store.updateState({
        user: 'Moon',
        isAuthenticated: true
      })
      store.updateState({
        user: 'Jung',
        isAuthenticated: true
      })
    },2000);
    setTimeout(() => {
      store.updateState({
        user: 'William',
        isAuthenticated: true
      })
    },3000);
    setTimeout(() => store.selectState('user')
      .subscribe((va) => console.log('user', va)),2000);
  }

}
