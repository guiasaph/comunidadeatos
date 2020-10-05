import { Component, Injector, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import { ConfirmarPresencaService } from '../app/confirmar-presenca.service';
import { MatTabGroup } from '@angular/material/tabs';
import { MatDialog } from '@angular/material/dialog';
import { PopupComponent } from '../app/popup/popup.component';
import { LoginService } from './login.service';
import { InterceptorService } from './interceptor.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private login: LoginService, private interceptor: InterceptorService) {}

  ngOnInit(): void {
    window.localStorage.setItem('lockScreen', 'false');
    if (window.localStorage.getItem('bearer') != null) {
      this.login.token = window.localStorage.getItem('bearer');
    }
  }

  checkAvailability() {
    const actualTime = new Date(new Date().setUTCHours(new Date().getUTCHours() - 3)).toUTCString();
    if (actualTime.slice(0, 3) === 'Sun' &&
      ((new Date('01-01-2020 ' + actualTime.slice(17, 25)) >= new Date('01-01-2020 10:00:00')) &&
        (new Date('01-01-2020 ' + actualTime.slice(17, 25)) <= new Date('01-01-2020 12:00:00')))) {
      return false;
    }
    else {
      return true;
    }
  }

  checkLoad() {
    return this.interceptor.loadScreen;
  }

}
