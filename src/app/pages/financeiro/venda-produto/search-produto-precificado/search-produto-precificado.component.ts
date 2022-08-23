import { Component, Inject, OnInit, Optional, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { merge, of as observableOf } from 'rxjs';
import { catchError, map, startWith, switchMap, take } from 'rxjs/operators';
import { PrecificacaoProdutoListDTO } from 'src/app/model/dto/PrecificacaoProdutoListDTO';
import { PageVO } from 'src/app/model/vo/pageVO';
import { FinanceiroService } from '../../financeiro.service';

@Component({
  selector: 'app-search-produto-precificado',
  templateUrl: './search-produto-precificado.component.html',
  styleUrls: ['./search-produto-precificado.component.css']
})
export class SearchProdutoPrecificadoComponent implements OnInit {

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  colunas: string[] = [
    'select',
    'cod_produto',
    'descricao',
    'tipo',
    'unid_venda',
    'valor_produto',
    'qtd_est_real'
  ];

  public resultsLength: number = 0;
  private changedQuery: Boolean = false;
  public precificacaoList: PrecificacaoProdutoListDTO[] = [];
  public filterForm!: FormGroup;
  public selecionados: PrecificacaoProdutoListDTO[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private financeiroService: FinanceiroService,
    private dialogRef: MatDialogRef<SearchProdutoPrecificadoComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public produtosSelecionados: [] = [],
  ) {

  }

  private setProdutosJaSelecionados() {
    if (this.selecionados.length > 0)
      return;

    this.produtosSelecionados.forEach(x => {
      let prod = this.precificacaoList.find((y: PrecificacaoProdutoListDTO) => y.idProduto == x['produto']!['id']);

      if (!!prod) {
        prod.selecionado = true;
        this.selecionados.push(prod);
      }

    })
  }

  ngOnInit(): void {
    this.filterForm = this.formBuilder.group({
      cod_produto: new FormControl(null),
      descricao: new FormControl(null, [Validators.minLength(5)]),
    })
  }

  ngAfterViewInit() {
    merge(this.sort.sortChange, this.paginator.page, this.paginator.pageSize)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.changedQuery = this.resultsLength == 0 ? true : false;

          return this.financeiroService.getAllProdutosPrecificacao(
            this.sort.active, this.sort.direction, this.paginator.pageIndex,
            this.paginator.pageSize, this.changedQuery, this.filterForm.value
          );
        }),
        map((pageVO: PageVO) => {
          if (this.changedQuery)
            this.resultsLength = pageVO?.totalElements!;

          return pageVO.content;
        }),
        catchError(() => {
          return observableOf([]);
        })
      ).subscribe(
        (data: PrecificacaoProdutoListDTO[]) => {
          this.precificacaoList = this.atualizaSelecioandos(data);
          this.setProdutosJaSelecionados();
        }
      );
  }

  public filtrar() {
    if (!this.filterForm.valid)
      return;

    merge(this.filterForm.controls['descricao'].value)
      .pipe(
        take(0),
        startWith({}),
        switchMap(() => {
          this.changedQuery = true;

          return this.financeiroService.getAllProdutosPrecificacao(
            this.sort.active, this.sort.direction, this.paginator.pageIndex,
            this.paginator.pageSize, this.changedQuery, this.filterForm.value
          );
        }),
        map((pageVO: PageVO) => {
          this.resultsLength = !!pageVO?.totalElements ? pageVO?.totalElements : 0;

          return pageVO.content;
        }),
        catchError(() => {
          return observableOf([]);
        })
      ).subscribe(
        (data: PrecificacaoProdutoListDTO[]) => this.precificacaoList = this.atualizaSelecioandos(data)
      );
  }

  public limparFiltro() {
    this.filterForm.reset();
    this.filtrar();
  }

  public selecionar(row: PrecificacaoProdutoListDTO, selecao: boolean) {
    if (this.selecionados.find(x => x.idProduto == row.idProduto))
      this.selecionados.splice(this.selecionados.findIndex(x => x.idProduto == row.idProduto), 1);
    else
      this.selecionados.push(row);
    this.precificacaoList.find(x => x.idProduto === row.idProduto)!.selecionado = selecao;
  }

  public setSelecao(row: PrecificacaoProdutoListDTO): boolean {
    return !!row?.selecionado ? true : false;
  }
  private atualizaSelecioandos(data: PrecificacaoProdutoListDTO[]) {
    data.forEach(x => x.selecionado = !!this.selecionados.find(y => y?.idProduto == x?.idProduto));
    return data;
  }

  public confirmar() {
    this.dialogRef.close(this.selecionados);
  }

  public cancelar() {
    this.dialogRef.close([]);
  }

}
