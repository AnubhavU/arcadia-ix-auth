import { LocalStorageService } from 'src/app/core/localstorage.service';
import { Injectable, NgZone } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { tap, catchError, map, retry } from 'rxjs/operators';
import { Router } from '@angular/router';
import { LoaderService } from '../utility/loader/loader.service';

@Injectable()
export class InterceptorService implements HttpInterceptor {


  constructor(private route: Router, private loader: LoaderService, private localStorage: LocalStorageService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    request = request.clone({
     // url: "http://localhost:8055" + request.url
    //  url: window.location.origin + request.url
     url: window.location.origin + "/ix-auth-server" +request.url
    });
    return next.handle(request).pipe(
      retry(2),
      catchError((error: HttpErrorResponse) => {
        // if (error.status == 0) {
        //   alert('Currently we are facing issue in fetching data please again later');
        // } else

        if (error.status === 401 || error.status === 403) {
          this.localStorage.clear();
          this.route.navigate(['/home']);
          // this.loader.hide();
        }
        return throwError(error);
      })
    );

  }

}
