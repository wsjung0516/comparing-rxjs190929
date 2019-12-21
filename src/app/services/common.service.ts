import { Injectable } from '@angular/core';
import {from} from 'rxjs';
import {filter, map, switchMap} from 'rxjs/operators';
import {untilDestroyed} from 'ngx-take-until-destroy';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor() { }
  filterObject(arr: any[]) {
    return from(arr).pipe(
      switchMap( obj => {
        return from(Object.keys(obj)).pipe(
          filter( ob =>  obj[ob] === '' ),
          map( val => { return{id: obj.id, key: val}})
        )
      })
    )
  }
}
