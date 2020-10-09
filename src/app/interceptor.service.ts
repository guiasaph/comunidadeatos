import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse
} from '@angular/common/http';
import { Observable, of } from "rxjs";
import { tap, catchError } from "rxjs/operators";


@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor{

  loadScreen = false;

  constructor() { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      tap(res => {
        if (res instanceof HttpResponse) {
          this.loadScreen = false;
        }
      }),
      catchError((err: any) => {
        // you can put a generic error treatement here
          return of(err);
      }));
  }
}
