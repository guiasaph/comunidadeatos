import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTabGroup } from '@angular/material/tabs';
import { ConfirmarPresencaService } from '../confirmar-presenca.service';
import { PopupComponent } from '../popup/popup.component';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent {

  constructor(private confirmarPresencaService: ConfirmarPresencaService, public dialog: MatDialog) { }

  validName = new FormControl('', [Validators.required]);
  enableElements = true;
  enableOverlay = false;
  nome;

  getErrorMessage() {
    if (this.validName.hasError('required')) {
      return 'O nome não pode estar em branco';
    }
  }

  inserirPessoa(matTab: MatTabGroup) {
    this.enableOverlay = true;
    this.confirmarPresencaService.registerNameInDataBase(this.nome).subscribe((res) => {
      this.enableOverlay = false;
      const dialogRef = this.dialog.open(PopupComponent, {
        data: {
          mensagem: `Olá irmã(o) ${this.nome}. Obrigado pela confirmação. Nos vemos domingo!`,
          erro: 'sucesso'
        }
      });
      this.validName = new FormControl({ value: this.nome, disabled: true });
      dialogRef.afterClosed().subscribe(() => { matTab.selectedIndex++; });
      this.enableElements = false;
    }, (err) => {
      this.enableOverlay = false;
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

}
