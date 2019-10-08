import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {retryWithBackoff} from '../components/retry-with-backoff';
import {delay, mergeMap, retryWhen, tap} from 'rxjs/operators';
import {Observable, of, throwError} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodosService {
  retries = 3;
  constructor(private http: HttpClient) { }

  getData() {
    return this.http.get('https://jsonplaceholder.typicode.com/todos/1')
      .pipe(
        retryWithBackoff(1000)
/*
        retryWhen((errors-component: Observable<any>) => errors-component.pipe(
          delay( 1000),
          mergeMap( error => this.retries-- > 0 ? of( error) : throwError('error occured'))
        ))
*/
      );
  }
}
