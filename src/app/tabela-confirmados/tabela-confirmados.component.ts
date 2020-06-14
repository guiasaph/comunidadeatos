import { Component, OnInit, Input, Output, ViewChild } from '@angular/core';
import { ConfirmarPresencaService } from '../confirmar-presenca.service';
import { MatTabGroup } from '@angular/material/tabs';
import { EventEmitter } from '@angular/core';
import { MatTableDataSource, MatTable } from '@angular/material/table';

@Component({
  selector: 'app-tabela-confirmados',
  templateUrl: './tabela-confirmados.component.html',
  styleUrls: ['./tabela-confirmados.component.css']
})
export class TabelaConfirmadosComponent implements OnInit {

  displayedColumns: string[] = ['position', 'name', 'dia'];
  dataSource = new MatTableDataSource();
  numero = 0;

  @Input() matTabIndex: MatTabGroup;
  @Output() resetForm = new EventEmitter();
  @ViewChild('tabela') tabela: MatTable<any>;

  constructor(private confirmarPresencaService: ConfirmarPresencaService) { }

  ngOnInit(): void {
    this.confirmarPresencaService.getAllRegister().subscribe((res: any) => {
      res.forEach(elem => {
        const createBRDate = new Date(new Date(elem.createdAt).setUTCHours(new Date(elem.createdAt).getUTCHours() - 3)).toUTCString();
        this.dataSource.data.push({position: ++this.numero, name: elem.name, dataConfirmacao: createBRDate});
      });
      this.tabela.renderRows();
    });
  }
}
