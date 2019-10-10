import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ToastrService} from 'ngx-toastr';
import {retryWithBackoffToast} from '../components/retry-with-backoff-toast';

@Injectable({
  providedIn: 'root'
})
export class TodosService {
  constructor(private http: HttpClient,
              private toastr: ToastrService ) { }

  getData() {
   return this.http.get('https://jsonplaceholder.typicode.com/todoss/1');
  }
}
