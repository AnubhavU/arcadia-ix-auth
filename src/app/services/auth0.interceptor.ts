import { LocalStorageService } from 'src/app/core/localstorage.service';
import { Injectable, NgZone } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { tap, catchError, map, retry } from 'rxjs/operators';
import { Router } from '@angular/router';
import { LoaderService } from '../utility/loader/loader.service';

@Injectable()
export class Auth0Interceptoreeee implements HttpInterceptor {


  constructor(private route: Router, private loader: LoaderService, private localStorage: LocalStorageService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const authReq = request.clone({
      headers: new HttpHeaders({
        'authorization': 'my-auth-token'
      })
    });


    return next.handle(authReq);

  }

}
