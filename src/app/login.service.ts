import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { url } from './configUrl';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  urlLogin = url + '/auth';

  token = null;

  constructor(private http: HttpClient) { }

  loginPastores(credentials): any {
    return this.http.post(this.urlLogin + '/login', credentials);
  }

}
