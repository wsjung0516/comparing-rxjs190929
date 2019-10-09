import { NgModule, ErrorHandler } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ErrorsComponent } from './errors-component/errors.component';
import {ErrorsHandler} from './errors-handler';
import {ErrorsRoutingModule} from './errors-routing/errors-routing.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ErrorsRoutingModule,
  ],
  declarations: [
    ErrorsComponent
  ],
  providers: [
    {
      provide: ErrorHandler,
      useClass: ErrorsHandler,
    },
  ]
})
export class ErrorsModule { }
