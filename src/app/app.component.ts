import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import { ConfirmarPresencaService } from '../app/confirmar-presenca.service';
import { MatTabGroup } from '@angular/material/tabs';
import { MatDialog } from '@angular/material/dialog';
import { PopupComponent } from '../app/popup/popup.component';
import { LoginService } from './login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private login: LoginService) {}

  ngOnInit(): void {
    if (window.localStorage.getItem('bearer') != null) {
      this.login.token = window.localStorage.getItem('bearer');
    }
  }

}
