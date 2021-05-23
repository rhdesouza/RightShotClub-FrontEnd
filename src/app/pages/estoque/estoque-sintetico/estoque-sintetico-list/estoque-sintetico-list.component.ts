import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { merge, of as observableOf } from 'rxjs';
import { catchError, map, startWith, switchMap, take } from 'rxjs/operators';
import { EstoqueDTO } from 'src/app/model/dto/EstoqueDTO';
import { PageVO } from 'src/app/model/vo/pageVO';
import { EstoqueService } from '../../estoque.service';


@Component({
  selector: 'app-estoque-sintetico-list',
  templateUrl: './estoque-sintetico-list.component.html',
  styleUrls: ['./estoque-sintetico-list.component.css']
})
export class EstoqueSinteticoListComponent implements OnInit {

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  colunas: string[] = [
    'id_produto',
    'descricao',
    'qtd_nota',
    'qtd_estoque',
    'estoque_minimo',
    'tipo',
    'unid_compra',
    'unid_venda'
  ];

  public resultsLength = 0;
  private changedQuery: Boolean = false;
  public estoqueSinteticoList: EstoqueDTO[] = [];
  public filterForm!: FormGroup;

  constructor(
    private estoqueService: EstoqueService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.filterForm = this.formBuilder.group({
      descricao: new FormControl(null, [Validators.minLength(5)]),
    })
  }

  ngAfterViewInit() {
    merge(this.sort.sortChange, this.paginator.page, this.paginator.pageSize)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.changedQuery = this.resultsLength == 0 ? true : false;

          return this.estoqueService.getAllEstoqueSinteticoPageable(
            this.sort.active, this.sort.direction, this.paginator.pageIndex,
            this.paginator.pageSize, this.changedQuery, this.filterForm.value
          );
        }),
        map((pageVO: PageVO) => {
          if (this.changedQuery)
            this.resultsLength = pageVO.totalElements || 0;

          return pageVO.content;
        }),
        catchError(() => {
          return observableOf([]);
        })
      ).subscribe(
        data => this.estoqueSinteticoList = data
      );
  }

  public filtrar() {
    if (!this.filterForm.valid)
      return;

    merge(this.filterForm.controls.descricao.value)
      .pipe(
        take(0),
        startWith({}),
        switchMap(() => {
          this.changedQuery = true;

          return this.estoqueService.getAllEstoqueSinteticoPageable(
            this.sort.active, this.sort.direction, this.paginator.pageIndex,
            this.paginator.pageSize, this.changedQuery, this.filterForm.value
          );
        }),
        map((pageVO: PageVO) => {
          this.resultsLength = pageVO.totalElements || 0;

          return pageVO.content;
        }),
        catchError(() => {
          return observableOf([]);
        })
      ).subscribe(
        (data: EstoqueDTO[]) => this.estoqueSinteticoList = data
      );
  }

  public limparFiltro() {
    this.filterForm.controls.descricao.setValue(null);
    this.filtrar();
  }



  public isAbaixoMinimo(qtdEstoque: number, estoqueMinimno: number): boolean {
    return qtdEstoque < estoqueMinimno;
  }
}
