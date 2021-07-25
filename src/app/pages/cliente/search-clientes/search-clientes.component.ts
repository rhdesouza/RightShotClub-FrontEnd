import { Component, Inject, OnInit, Optional, ViewChild } from '@angular/core';
import { MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ModalService } from 'src/app/common/services/modal.service';
import { SnakeBarService } from 'src/app/common/snakebar/snakebar.service';
import { Cliente } from 'src/app/model/entity/Cliente';
import { AddClienteComponent } from '../cliente-list/add-cliente/add-cliente.component';
import { ClienteService } from '../cliente.service';

@Component({
  selector: 'app-search-clientes',
  templateUrl: './search-clientes.component.html',
  styleUrls: ['./search-clientes.component.css']
})
export class SearchClientesComponent implements OnInit {

  colunas: string[] = [
    'id',
    'nome',
    'cpf',
    'email',
    'acoes'
  ];

  public clienteList;
  public linhaSelecionada;
  public clienteSelecionado;

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  constructor(
    private dialogRef: MatDialogRef<SearchClientesComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public cliente: any,
    private clienteService: ClienteService,
    private modalService: ModalService,
    private snakeBarService: SnakeBarService
  ) {
    this.getAllCliente();
  }

  ngOnInit(): void {
    if (!!this.cliente) {
      this.linhaSelecionada = this.cliente;
    }
  }

  private getAllCliente() {
    this.clienteService.getAllClientes().subscribe((retorno: Cliente[]) => {
      this.clienteList = new MatTableDataSource(retorno);
      this.clienteList.paginator = this.paginator;
      this.clienteList.sort = this.sort;
    }
    )
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.clienteList.filter = filterValue.trim().toLowerCase();
  }

  public selecionar(linha: any) {
    this.linhaSelecionada = (this.linhaSelecionada == linha.id) ? null : linha.id;
    this.clienteSelecionado = !!this.linhaSelecionada ? linha : null;
  }

  public salvar() {
    this.dialogRef.close(this.clienteSelecionado);
  }

  public fechar() {
    this.dialogRef.close("close");
  }

  editar(row: Cliente) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.width = '50%';
    dialogConfig.data = row.id;

    this.modalService.openModal(AddClienteComponent, dialogConfig).afterClosed().subscribe(rs => {
      if (rs != 'error' && !!rs) {
        this.getAllCliente();
        this.snakeBarService.openSnackBarSuccess("Registro editado com sucesso!");
      } else if (rs == 'error') {
        this.snakeBarService.openSnackBarError('Erro ao editar registro.');
      }
    })
  }
  public adicionarCliente() {
    this.modalService.openModal(AddClienteComponent).afterClosed().subscribe(data => {
      if (data != 'error' && !!data) {
        this.getAllCliente();
        this.snakeBarService.openSnackBarSuccess("Registro salvo com sucesso!");
      } else if (data == 'error') {
        this.snakeBarService.openSnackBarError('Erro ao salvar registro.');
      }
    })
  }

}
