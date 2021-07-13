import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTabGroup } from '@angular/material/tabs';
import { EventEmitter } from 'events';
import { ConfirmarPresencaService } from '../confirmar-presenca.service';
import { LoginService } from '../login.service';
import { PopupComponent } from '../popup/popup.component';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent { 
  
  constructor(private confirmarPresencaService: ConfirmarPresencaService, public dialog: MatDialog, private loginAPI: LoginService) { }

  validName = new FormControl('', [Validators.pattern('[A-Za-z\u00C0-\u00FF]+[A-Za-z\u00C0-\u00FF ]*'), Validators.required]);
  enableElements = true;
  recaptchaFail = true;
  nome;

  getErrorMessage() {
    if (this.validName.hasError('required')) {
      return 'O nome não pode estar em branco';
    }
    if (this.validName.hasError('pattern')) {
      return 'Existem caracteres inválidos. É possível incluir apenas um nome por vez.'
    }
  }

  inserirPessoa(matTab: MatTabGroup) {
    this.confirmarPresencaService.registerNameInDataBase(this.nome).subscribe((res) => {
      const dialogRef = this.dialog.open(PopupComponent, {
        data: {
          mensagem: `Olá irmã(o) ${this.nome}. Obrigado pela confirmação. Nos vemos domingo!`,
          erro: 'sucesso'
        }
      });
      this.validName = new FormControl({ value: this.nome, disabled: true });
      this.enableElements = false;
      dialogRef.afterClosed().subscribe(() => { matTab.selectedIndex++; matTab.ngAfterContentChecked() });
    }, (err) => {
      this.dialog.open(PopupComponent, {
        data: {
          mensagem: `Olá irmã(o) ${this.nome}. Pedimos Desculpas mas não foi possível inseri-lo na lista. Possivelmente a lista já está cheia (favor verificar na aba Confirmados), ou estamos enfrentando algum problema de conexão.`,
          erro: 'falha'
        }
      });
    });
  }

  resetForm() {
    this.validName = new FormControl({ value: '', disabled: false });
    this.enableElements = true;
    this.nome = undefined;
  }

  resolved(captchaResponse: string) {
    this.loginAPI.checkReCAPTCHA(captchaResponse).subscribe((res: any) => {
      this.recaptchaFail = !res.success;
    });
  }

}
