import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpErrorResponse
} from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, finalize, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { LoginService } from './login.service';


@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor{

  constructor(private router: Router, private login: LoginService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (localStorage.getItem('bearer') != null) {
      req = req.clone({
        setHeaders: {
          authorization: localStorage.getItem('bearer')
        }
      });
    }
    return next.handle(req).pipe(
      tap(() => {
        this.login.isLoading.next(true);
      }),
      catchError(err => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401 || err.status === 403) {
            localStorage.clear();
            this.router.navigate(['/login']);
          }
        }
        return throwError(new Error(err.statusText));
      }),
      finalize(() => {
        this.login.isLoading.next(false);
      })
    );
  }
}
