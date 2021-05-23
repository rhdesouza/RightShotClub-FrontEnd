import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ModalService } from 'src/app/common/services/modal.service';
import { SnakeBarService } from 'src/app/common/snakebar/snakebar.service';
import { AlertService } from 'src/app/common/_alert';
import { Produto } from 'src/app/model/entity/Produto';

import { EstoqueService } from '../../estoque.service';
import { AddProdutoComponent } from '../add-produto/add-produto.component';

@Component({
  selector: 'app-produto-list',
  templateUrl: './produto-list.component.html',
  styleUrls: ['./produto-list.component.css']
})
export class ProdutoListComponent implements OnInit {
  public produtoList!: MatTableDataSource<Produto>;
  

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  colunas: string[] = [
    'id',
    'codProduto',
    'descricao',
    'tipoProduto',
    'ncm',
    'dataCadastro',
    'dataDesativacao',
    'acoes'
  ];

  constructor(
    private estoqueService: EstoqueService,
    public dialog: MatDialog,
    public alertService: AlertService,
    private snakeBarService: SnakeBarService,
    private modalService: ModalService
  ) {
    this.getAllProduto();
  }

  ngOnInit(): void {
  }

  private getAllProduto(): any {
    this.estoqueService.getAllProduto().subscribe((retorno: Produto[]) => {
      this.produtoList = new MatTableDataSource(retorno);
      this.produtoList.paginator = this.paginator;
      this.produtoList.sort = this.sort;
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.produtoList.filter = filterValue.trim().toLowerCase();
  }

  public adicionarProduto() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.width = '70%';

    this.modalService.openModal(AddProdutoComponent, dialogConfig)
      .afterClosed().subscribe(data => {
        if (data != 'error' && !!data) {
          const datas = this.produtoList.data;
          datas.push(data);
          this.produtoList.data = datas;
          this.snakeBarService.openSnackBarSuccess("Registro salvo com sucesso!");
        } else if (data == 'error') {
          this.snakeBarService.openSnackBarError('Erro ao salvar registro.');
        }
      })
  }

  public editar(idProduto) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.width = '70%';
    dialogConfig.data = idProduto;

    this.modalService.openModal(AddProdutoComponent, dialogConfig)
      .afterClosed().subscribe(rs => {
        if (rs != 'error' && !!rs) {
          const datas: Produto[] = this.produtoList.data;
          datas.forEach((element: Produto) => {
            if (element.id == rs.id) {
              element.descricao = rs.descricao;
              element.tipoProduto = rs.tipoProduto;
              element.ncm = rs.ncm;
            }
          });
          this.produtoList.data = datas;
          this.snakeBarService.openSnackBarSuccess("Registro editado com sucesso!");
        } else if (rs == 'error') {
          this.snakeBarService.openSnackBarError('Erro ao editar registro.');
        }
      })
  }

  public desativarProduto(idProduto: number) {
    this.estoqueService.desativarProdutoPorId(idProduto).subscribe((produto: Produto) => {
      const datas: Produto[] = this.produtoList.data;
      datas.forEach(element => {
        if (element.id == produto.id) {
          element.dataDesativacao = produto.dataDesativacao;
        }
      });
      this.produtoList.data = datas;
      this.snakeBarService.openSnackBarSuccess("Registro editado com sucesso!")
    })
  }
}
