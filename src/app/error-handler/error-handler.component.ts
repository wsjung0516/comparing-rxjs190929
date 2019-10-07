import { Component, OnInit } from '@angular/core';
import {TodosService} from '../services/todos.service';

@Component({
  selector: 'app-error-handler',
  template: `
    <p>
      error-handler works!
    </p>
  `,
  styles: []
})
export class ErrorHandlerComponent implements OnInit {

  constructor(private todoService: TodosService) { }

  ngOnInit() {
    this.todoService.getData().pipe()
      .subscribe( value => console.log('value', value));

  }
  readData() {

  }
}
