import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CadastrarMembroService } from '../cadastrar-membro.service';
import { PopupComponent } from '../popup/popup.component';

@Component({
  selector: 'app-cadastro-membro',
  templateUrl: './cadastro-membro.component.html',
  styleUrls: ['./cadastro-membro.component.css']
})
export class CadastroMembroComponent implements OnInit {

  cadastroMembro = {
    name: '',
    phone: '',
    birthDate: ''
  };

    name = new FormControl('', [Validators.pattern('[A-Za-z\u00C0-\u00FF]+[ ][A-Za-z\u00C0-\u00FF ]*'), Validators.required]);
    phone = new FormControl('', [Validators.pattern('[(][0-9]{2}[)][ ][0-9]{1}[ ][0-9]{4}-[0-9]{4}'), Validators.required]);
    birthDate = new FormControl('', [Validators.pattern('[0-9]{2}/[0-9]{2}/[0-9]{4}'), Validators.required]);

  constructor(private router: Router, private service: CadastrarMembroService, public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  sendInformation() {
    this.cadastroMembro.birthDate = this.birthDate.value;
    this.cadastroMembro.name = this.name.value;
    this.cadastroMembro.phone = this.phone.value;
    this.service.postNewUser(this.cadastroMembro).subscribe((res) => {
      const dialogRef = this.dialog.open(PopupComponent, {
        data: {
          mensagem: `Seu Cadastro foi Recebido. Obrigado.`,
          erro: 'sucesso'
        }
      });
      dialogRef.afterClosed().subscribe(() => {
        this.router.navigate(['/']);
      });
    });
  }

  goHome() {
    this.router.navigate(['/']);
  }

}
