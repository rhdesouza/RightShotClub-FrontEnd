import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ModalService } from 'src/app/common/services/modal.service';
import { SnakeBarService } from 'src/app/common/snakebar/snakebar.service';
import { TipoProduto } from 'src/app/model/entity/TipoProduto';

import { EstoqueService } from '../../estoque.service';
import { AddTipoProdutoComponent } from '../add-tipo-produto/add-tipo-produto.component';

@Component({
  selector: 'app-tipo-produto-list',
  templateUrl: './tipo-produto-list.component.html',
  styleUrls: ['./tipo-produto-list.component.css']
})
export class TipoProdutoListComponent implements OnInit {
  public tipoProdutoList!: MatTableDataSource<TipoProduto>;

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  colunas: string[] = [
    'id',
    'tipo',
    'unidCompra',
    'unidVenda',
    'acoes'
  ];

  constructor(
    private estoqueService: EstoqueService,
    public dialog: MatDialog,
    private snakeBarService: SnakeBarService,
    private modalService: ModalService,
  ) {
    this.getAllTipoProduto();
  }

  ngOnInit(): void {

  }

  private getAllTipoProduto(): any {
    this.estoqueService.getAllTipoProduto().subscribe((retorno: TipoProduto[]) => {
      this.tipoProdutoList = new MatTableDataSource(retorno);
      this.tipoProdutoList.paginator = this.paginator;
      this.tipoProdutoList.sort = this.sort;
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.tipoProdutoList.filter = filterValue.trim().toLowerCase();
  }

  public adicionarTipoProduto() {
    this.modalService.openModal(AddTipoProdutoComponent)
      .afterClosed().subscribe(data => {
        if (data != 'error' && !!data) {
          const datas = this.tipoProdutoList.data;
          datas.push(data);
          this.tipoProdutoList.data = datas;
          this.snakeBarService.openSnackBarSuccess("Registro salvo com sucesso!");
        } else if (data == 'error') {
          this.snakeBarService.openSnackBarError('Erro ao salvar registro.');
        }
      })
  }

  editar(linha: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.width = '50%';
    dialogConfig.data = linha.id;

    this.modalService.openModal(AddTipoProdutoComponent, dialogConfig)
      .afterClosed().subscribe(rs => {
        if (rs != 'error' && !!rs) {
          const datas: TipoProduto[] = this.tipoProdutoList.data;
          datas.forEach(element => {
            if (element.id == rs.id) {
              element.tipo = rs.tipo;
              element.unidCompra = rs.unidCompra;
              element.unidVenda = rs.unidVenda;
            }
          });
          this.tipoProdutoList.data = datas;
          this.snakeBarService.openSnackBarSuccess("Registro editado com sucesso!");
        } else if (rs == 'error') {
          this.snakeBarService.openSnackBarError('Erro ao editar registro.');
        }
      })
  }

}
