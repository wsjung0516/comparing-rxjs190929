import {Component, OnDestroy, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {TodosService} from '../services/todos.service';
import {retryWithBackoff} from '../components/retry-with-backoff';
import {take, tap} from 'rxjs/operators';
import {ToastrService} from 'ngx-toastr';
import {NotificationService} from '../services/notification.service';
import {untilDestroyed} from 'ngx-take-until-destroy';

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
export class CommTestComponent implements OnInit, OnDestroy {

  constructor( private http: HttpClient,
               private todos: TodosService,
               private toastr: ToastrService,
               private notiService: NotificationService
               ) {
  }

  ngOnInit() {

    this.notiService.notification$.pipe(untilDestroyed(this)).subscribe(  (value) => {
      if( value) {
        console.log('notiService is called-->', value, this.toastr);
        // this.toastr.success( 'success', 'Notification');
        this.toastr.error(value, 'Notification', {timeOut: 10000, closeButton: true  });
      }
    });
  }
  readData() {
    this.todos.getData().subscribe(value => console.log('result',value));
  }
  ngOnDestroy(): void {
  }
}
