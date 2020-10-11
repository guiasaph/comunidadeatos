import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import * as moment from 'moment-timezone';
import { LoginService } from './login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {

  constructor(public login: LoginService) {}

  ngOnInit(): void {
  }

  checkAvailability() {
    const actualTime = moment.tz('America/Sao_Paulo').format();
    if (moment.tz('America/Sao_Paulo').format('dddd') === 'Sunday' &&
      ((new Date('01-01-2020 ' + actualTime.slice(11, 19)) >= new Date('01-01-2020 10:00:00')) &&
        (new Date('01-01-2020 ' + actualTime.slice(11, 19)) <= new Date('01-01-2020 12:00:00')))) {
      return false;
    }
    else {
      return true;
    }
  }
}
