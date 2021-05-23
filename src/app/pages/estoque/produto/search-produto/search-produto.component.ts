import { Inject } from '@angular/core';
import { Optional, ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Produto } from 'src/app/model/entity/Produto';

import { EstoqueService } from '../../estoque.service';

@Component({
  selector: 'app-search-produto',
  templateUrl: './search-produto.component.html',
  styleUrls: ['./search-produto.component.css']
})
export class SearchProdutoComponent implements OnInit {

  colunas: string[] = [
    'id',
    'codProduto',
    'descricao',
    'tipoProduto',
    'unidCompra',
    'unidVenda'
  ];

  public produtosList;
  public linhaSelecionada;
  public produtoSelecionado;

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  constructor(
    private estoqueService: EstoqueService,
    private dialogRef: MatDialogRef<SearchProdutoComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public produto: any,
  ) {
    this.getAllProdutos();
  }

  ngOnInit(): void {
    if (!!this.produto) {
      this.linhaSelecionada = this.produto;
    }

  }

  private getAllProdutos() {
    this.estoqueService.getAllProduto().subscribe((retorno: Produto[]) => {
      this.produtosList = new MatTableDataSource(retorno);
      this.produtosList.paginator = this.paginator;
      this.produtosList.sort = this.sort;
    }
    )
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.produtosList.filter = filterValue.trim().toLowerCase();
  }

  public selecionar(linha: any) {
    this.linhaSelecionada = (this.linhaSelecionada == linha.codProduto) ? null : linha.codProduto;
    this.produtoSelecionado = !!this.linhaSelecionada ? linha : null;
  }

  public salvar() {
    this.dialogRef.close(this.produtoSelecionado);
  }

  public fechar() {
    this.dialogRef.close('close');
  }
}
