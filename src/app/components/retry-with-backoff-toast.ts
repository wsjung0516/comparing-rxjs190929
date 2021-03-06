import {Observable, of, throwError} from 'rxjs';
import {delay, map, mergeMap, retryWhen, tap} from 'rxjs/operators';
import {ToastInjector, ToastRef, ToastrService} from 'ngx-toastr';


const getErrorMessage = ( maxRetry: number) =>
  `Tried to load Resource over Http for ${maxRetry} times without success. Giving up.`;
const DEFAULT_MAX_RETRIES = 2;
const DEFAULT_BACKOFF = 1000;
export function retryWithBackoffToast( delayMs: number, toast: ToastrService, maxRetry = DEFAULT_MAX_RETRIES,
                                  backoffMs = DEFAULT_BACKOFF ) {
  let retries = maxRetry;
  //

  return ( src: Observable<any>) =>
    src.pipe(
      retryWhen((errors: Observable<any>) => errors.pipe (
        tap( val => console.log('retryWhen is called')),
        mergeMap( error => {
          toast.error('Network is unstable', 'Connection Error', {timeOut: 2000})
          if( error.status === 404 ) {
            console.log('the page is not found-->', error, error.status);
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
