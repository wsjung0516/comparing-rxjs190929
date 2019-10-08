import { NgModule, ErrorHandler } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { ErrorsComponent } from './errors-component/errors.component';
import {ErrorsHandler} from './errors-handler';
import {ServerErrorsInterceptor} from './server-errors-interceptor';
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
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ServerErrorsInterceptor,
      multi: true
    },
  ]
})
export class ErrorsModule { }
