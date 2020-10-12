import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { url } from './configUrl';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  isLoading: Subject<boolean> = new Subject();

  urlLogin = url + '/auth';

  constructor(private http: HttpClient) { }

  loginPastores(credentials): any {
    return this.http.post(this.urlLogin + '/login', credentials);
  }

  checkReCAPTCHA(token) {
    return this.http.post(this.urlLogin + '/recaptcha',
      { response: token });
  }

}
