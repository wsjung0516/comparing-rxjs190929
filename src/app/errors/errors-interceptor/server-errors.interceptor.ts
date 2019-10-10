import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Router } from '@angular/router';

import { ErrorsService } from '../errors-service/errors.service';
import {Observable, of, throwError} from 'rxjs';
import {delay, mergeMap, retry, retryWhen, tap} from 'rxjs/operators';
import {ToastrService} from 'ngx-toastr';
const DEFAULT_MAX_RETRIES = 3;
const DEFAULT_BACKOFF = 1000;

@Injectable()
export class ServerErrorsInterceptor implements HttpInterceptor {
  constructor(
    private router: Router,
    private errorsService: ErrorsService,
    private toastr: ToastrService
  ) { }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(request).pipe(
      this.retryWithBackoff(1000),
      // tap( val => console.log('intercept val-->', val))
    );

  }
  retryWithBackoff( delayMs: number, maxRetry = DEFAULT_MAX_RETRIES,
                    backoffMs = DEFAULT_BACKOFF ) {
    let retries = maxRetry;
    //

    return ( src: Observable<any>) =>
      src.pipe(
        retryWhen((errors: Observable<any>) => errors.pipe (
          tap( val => console.log('retry connection', val)),
          mergeMap( error => {
            this.toastr.error('Network is unstable', 'Connection Error', {timeOut: 2000})
            if( error.status === 404 ) {
              // console.log('the page is not found-->', error, error.status);
              return throwError( error );
            }
            if ( retries-- > 0) {
              const backoffTime = delayMs + (maxRetry - retries) * backoffMs;
              return of(error).pipe( delay(backoffTime));
            }
            return throwError( error);
            // return throwError( getErrorMessage(maxRetry));
          })
        )));
  }

}
