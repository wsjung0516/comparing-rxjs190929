import {Observable, of, throwError} from 'rxjs';
import {delay, mergeMap, retryWhen, tap} from 'rxjs/operators';


const getErrorMessage = ( maxRetry: number) =>
  `Tried to load Resource over Http for ${maxRetry} times without success. Giving up.`;
const DEFAULT_MAX_RETRIES = 3;
const DEFAULT_BACKOFF = 1000;
export function retryWithBackoff( delayMs: number, maxRetry = DEFAULT_MAX_RETRIES,
                                  backoffMs = DEFAULT_BACKOFF ) {
  let retries = maxRetry;
  //

  return ( src: Observable<any>) =>
    src.pipe(
      retryWhen((errors: Observable<any>) => errors.pipe (
        tap( val => console.log('retry connection', val)),
        mergeMap( error => {
          // toast.error('Network is unstable', 'Connection Error', {timeOut: 2000})
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
