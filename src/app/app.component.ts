import { AfterContentChecked, ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import * as moment from 'moment-timezone';
import { LoginService } from './login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {

  maintenance;

  constructor(public login: LoginService) {}

  ngOnInit(): void {
    this.login.getServerTime().subscribe((res: any) => {
      if (res.time.split(' ')[0]=='domingo' && Number(res.time.split(' ')[1].substring(0,2)) >= 9 && Number(res.time.split(' ')[1].substring(0,2)) < 12) {
        this.maintenance = false;
      }
      else {
        this.maintenance = true;
      }
    });
  }
}
