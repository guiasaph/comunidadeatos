import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../login.service';
import { PopupComponent } from '../popup/popup.component';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit, CanActivate {

  usuario = new FormControl('', [Validators.required]);
  senha = new FormControl('', [Validators.required]);

  constructor(private loginAPI: LoginService, public dialog: MatDialog, private router: Router) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (localStorage.getItem('bearer') != null){
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }



  ngOnInit(): void {
    if (localStorage.getItem('bearer') != null) {
      this.router.navigate(['/admin-panel']);
    }
  }

  login() {
    this.loginAPI.loginPastores({user: this.usuario.value, pwd: this.senha.value}).subscribe(resp => {
      localStorage.setItem('bearer', resp.token);
      this.router.navigate(['/admin-panel']);
    }, err => {
      this.dialog.open(PopupComponent, {
        data: {
          mensagem: `Credenciais Inválidas`,
          erro: 'falha-login'
        }
      });
    });
  }

}
