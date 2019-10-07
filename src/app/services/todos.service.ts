import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {retryWithBackoff} from '../components/retry-with-backoff';

@Injectable({
  providedIn: 'root'
})
export class TodosService {

  constructor(private http: HttpClient) { }

  getData() {
    return this.http.get('https://jsonplaceholder.typicode.com/todos/1')
      .pipe(
        retryWithBackoff(1000)
      );

  }
}
