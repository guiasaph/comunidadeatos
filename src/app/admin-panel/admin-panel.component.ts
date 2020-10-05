import { AfterContentChecked, AfterContentInit, AfterViewChecked, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { CadastrarMembroService } from '../cadastrar-membro.service';
import { LoginService } from '../login.service';
import { PopupComponent } from '../popup/popup.component';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  displayedColumns: string[] = ['name', 'phone', 'birthDate', 'remove'];
  dataSource: MatTableDataSource<any>;

  constructor(public route: Router, private membroService: CadastrarMembroService, private dialog: MatDialog,
              private login: LoginService) { }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource<any>();
    this.membroService.getAllMembers(this.login.token).subscribe((elem: any) => {
      this.dataSource.data = elem;
      this.dataSource.paginator = this.paginator;
    },
    err => {
      if (err.status === 403 || err.status === 401) {
        this.login.token = null;
        window.localStorage.clear();
        this.route.navigate(['/login']);
      }
    });
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  logoff() {
    window.localStorage.clear();
    this.route.navigate(['/']);
  }

  confirmExclusion(item) {
    const dialogRef = this.dialog.open(PopupComponent, {
      data: {
        mensagem: 'Confirmar exclusão de ' + item.name + ' ?',
        erro: 'confirma-exclusao'
      }
    });
    dialogRef.afterClosed().subscribe(() => {
      if (dialogRef.componentInstance.data.confirm) {
        this.membroService.deleteMember(item).subscribe(() => {
          this.membroService.getAllMembers(this.login.token).subscribe((res: any) => {
            this.dataSource.data = res;
          });
        });
      }
    });
  }

  updateCadastro(item) {
    delete item.updateNome;
    delete item.updateCelular;
    delete item.updateDataNascimento;
    this.membroService.updateMember(item).subscribe(() => {
      this.membroService.getAllMembers(this.login.token).subscribe((res: any) => {
        this.dataSource.data = res;
        this.dialog.open(PopupComponent, {
          data: {
            mensagem: 'Linha atualizada com sucesso!',
            erro: 'sucesso'
          }
        });
      });
    });
  }
}
