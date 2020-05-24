import { Component } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import { ConfirmarPresencaService } from '../app/confirmar-presenca.service';
import { MatTabGroup } from '@angular/material/tabs';
import { MatDialog } from '@angular/material/dialog';
import { PopupComponent } from '../app/popup/popup.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private confirmarPresencaService: ConfirmarPresencaService,
              public dialog: MatDialog) {}

  validName = new FormControl('', [Validators.required]);
  enableElements = true;
  nome;

  getErrorMessage() {
    if (this.validName.hasError('required')) {
      return 'O nome não pode estar em branco';
    }
  }

  inserirPessoa(matTab: MatTabGroup) {
    this.confirmarPresencaService.registerNameInDataBase(this.nome).subscribe((res) => {
      const dialogRef = this.dialog.open(PopupComponent, {
        data: {
          mensagem: `Olá irmã(o) ${this.nome}. Obrigado pela confirmação. Nos vemos domingo!`,
          erro: false
        }
      });
      this.validName = new FormControl({value: this.nome, disabled: true});
      dialogRef.afterClosed().subscribe(() => { matTab.selectedIndex++; });
      this.enableElements = false;
    }, (err) => {
      this.dialog.open(PopupComponent, {
        data: {
          mensagem: `Olá irmã(o) ${this.nome}. Pedimos Desculpas mas não foi possível inseri-lo na lista. Possivelmente a lista já está cheia (favor verificar na aba Confirmados), ou estamos enfrentando algum problema de conexão.`,
          erro: true
        }
      });
    });
  }

  resetForm() {
    this.validName = new FormControl({value: '', disabled: false});
    this.enableElements = true;
    this.nome = undefined;
  }
}
