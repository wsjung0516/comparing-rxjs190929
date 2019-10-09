import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {TodosService} from '../services/todos.service';
import {retryWithBackoff} from '../components/retry-with-backoff';
import {tap} from 'rxjs/operators';
import {ToastrService} from 'ngx-toastr';
import {NotificationService} from '../services/notification.service';

@Component({
  selector: 'app-comm-test',
  template:
  `
    <p>
        this is the comm-test component
    </p>
    <button (click)="readData()">Read Data</button>
    
  `  ,
  styles: []
})
export class CommTestComponent implements OnInit {

  constructor( private http: HttpClient,
               private todos: TodosService,
               private toastr: ToastrService,
               private notiService: NotificationService
               ) {
  }

  ngOnInit() {

    this.notiService.notification$.subscribe( value => {
      console.log('notiService is called', value);
      if( value) this.toastr.error(value, 'Notification', {timeOut:10000, closeButton: true})
    })
  }
  readData() {
    this.todos.getData().subscribe(value => console.log('result',value));
  }

}
