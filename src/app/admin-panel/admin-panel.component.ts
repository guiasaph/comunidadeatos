import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { CadastrarMembroService } from '../cadastrar-membro.service';
import { LoginService } from '../login.service';
import { PopupComponent } from '../popup/popup.component';
import { utils, writeFileXLSX } from 'xlsx'

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit, AfterViewInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  displayedColumns: string[] = ['name', 'phone', 'birthDate', 'remove'];
  dataSource: MatTableDataSource<any>;

  constructor(public route: Router, private membroService: CadastrarMembroService, private dialog: MatDialog,
              private login: LoginService) { }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource<any>();
    this.membroService.getAllMembers().subscribe((elem: any) => {
      this.dataSource.data = elem;
      this.dataSource.paginator = this.paginator;
    });
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  logoff() {
    window.localStorage.clear();
    this.route.navigate(['/']);
  }

  downloadExcel() {
    this.membroService.getAllMembers().subscribe((data: any) => {
      data = data.map(x => ({
        "Nome": x.name,
        "Telefone": x.phone,
        "Data Aniversario": x.birthDate
      }))
      const workbook = utils.book_new()
      utils.book_append_sheet(workbook, utils.json_to_sheet(data), "Membros")
      writeFileXLSX(workbook, "Comunidade_Atos_Usuarios_Cadastrados.xlsx", { compression: true })
    });
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
          this.membroService.getAllMembers().subscribe((res: any) => {
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
      this.membroService.getAllMembers().subscribe((res: any) => {
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
