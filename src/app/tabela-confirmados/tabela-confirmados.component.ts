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
  @Input() matTabIndex: MatTabGroup;
  @Output() resetForm = new EventEmitter();
  @ViewChild('tabela') tabela: MatTable<any>;

  constructor(private confirmarPresencaService: ConfirmarPresencaService) { }

  ngOnInit(): void {
    this.confirmarPresencaService.getAllRegister().subscribe((res: any) => {
      res.forEach(elem => {
        const createBRDate = new Date(elem.createdAt.slice(0, 10));
        createBRDate.setHours(createBRDate.getHours() - 3);
        this.dataSource.data.push({position: ++this.numero, name: elem.name, dataConfirmacao: createBRDate});
      });
      this.tabela.renderRows();
    });
  }

  displayedColumns: string[] = ['position', 'name', 'dia'];
  dataSource = new MatTableDataSource;
  numero = 0;

}
