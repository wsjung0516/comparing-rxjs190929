import {Component, OnDestroy, OnInit} from '@angular/core';
import {filter, map, switchMap} from 'rxjs/operators';
import {from} from 'rxjs';
import {untilDestroyed} from 'ngx-take-until-destroy';
import {CommonService} from '../services/common.service';

@Component({
  selector: 'app-filter-object',
  template: `
    <p>
      filter-object works!
    </p>
  `,
  styles: []
})
export class FilterObjectComponent implements OnInit {

  constructor( private common: CommonService) { }
  objects = [
    {
      id: 'id1',
      key2: 'key2',
      key3: 'key3',
      key4: 'key4',
      key5: 'key5',
      key6: 'key6'
    },
    {
      id: 'id2',
      key2: 'key2',
      key3: '',
      key4: 'key4',
      key5: 'key5',
      key6: 'key6'
    },
    {
      id: 'id3',
      key2: 'key2',
      key3: 'key3',
      key4: 'key4',
      key5: '',
      key6: 'key6'
    },
    {
      id: 'id4',
      key2: '',
      key3: '',
      key4: 'key4',
      key5: 'key5',
      key6: 'key6'
    },
  ];

  ngOnInit() {
    this.common.filterObject(this.objects)
      .subscribe( val => console.log('result->', val), ()=>{}, ()=> console.log('completed'));

  }

}
