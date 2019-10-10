import { NgModule, ErrorHandler } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ErrorsComponent } from './errors-component/errors.component';
// import {ErrorsHandler} from './errors-handler';
import {ErrorsRoutingModule} from './errors-routing/errors-routing.module';
// import {HTTP_INTERCEPTORS} from '@angular/common/http';
// import {ServerErrorsInterceptor} from './errors-interceptor/server-errors.interceptor';

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
  ]
})
export class ErrorsModule { }
