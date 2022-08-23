import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { merge, of as observableOf } from 'rxjs';
import { catchError, map, startWith, switchMap, take } from 'rxjs/operators';
import { configDataModalDialog } from 'src/app/common/modal-dialog/template/dialog/template-modal-dialog/template-modal-dialog.component';
import { ModalService } from 'src/app/common/services/modal.service';
import { SnakeBarService } from 'src/app/common/snakebar/snakebar.service';
import { PrecificacaoProdutoHistoricoDTO } from 'src/app/model/dto/PrecificacaoProdutoHistoricoDTO';
import { PrecificacaoProdutoListDTO } from 'src/app/model/dto/PrecificacaoProdutoListDTO';
import { PrecificacaoProduto } from 'src/app/model/entity/PrecificacaoProduto';
import { PageVO } from 'src/app/model/vo/pageVO';
import { FinanceiroService } from '../../financeiro.service';
import { AddPredicifacaoProdutoComponent } from '../add-predicifacao-produto/add-predicifacao-produto.component';
import { HistoricoPrecificacaoComponent } from '../historico-precificacao/historico-precificacao.component';

@Component({
  selector: 'app-precificacao-produto-list',
  templateUrl: './precificacao-produto-list.component.html',
  styleUrls: ['./precificacao-produto-list.component.css']
})
export class PrecificacaoProdutoListComponent implements OnInit {

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  colunas: string[] = [
    'cod_produto',
    'descricao',
    'tipo',
    'unid_compra',
    'unid_venda',
    'valor_produto',
    'acoes'
  ];

  public resultsLength: number = 0;
  private changedQuery: Boolean = false;
  public precificacaoList: PrecificacaoProdutoListDTO[] = [];
  public filterForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private financeiroService: FinanceiroService,
    private modalService: ModalService,
    private snakeBarService: SnakeBarService
  ) {

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
        (data: PrecificacaoProdutoListDTO[]) => this.precificacaoList = data
      );
  }

  public filtrar() {
    if (!this.filterForm.valid)
      return;

    merge(observableOf(this.filterForm.controls['descricao'].value))
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
        (data: PrecificacaoProdutoListDTO[]) => this.precificacaoList = data
      );
  }

  public limparFiltro() {
    this.filterForm.reset();
    this.filtrar();
  }

  public abrirModalPrecificar(idProduto: number) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.width = '70%';
    dialogConfig.data = idProduto;

    this.modalService.openModal(AddPredicifacaoProdutoComponent, dialogConfig)
      .afterClosed().subscribe(data => {
        if (data != 'error' && !!data) {
          this.snakeBarService.openSnackBarSuccess("Registro salvo com sucesso!");
          this.filtrar();
        } else if (data == 'error') {
          this.snakeBarService.openSnackBarError('Erro ao salvar registro.');
        }
      })
  }

  public removerPrecificacao(produto: PrecificacaoProdutoListDTO) {

    let configDialog: configDataModalDialog = {
      titulo: "Atenção",
      mensagem: `Confirma a exclusão do valor do produto:  ${produto.descricao}`,
      labelBotao1: "Sim",
      labelBotao2: "Não",
    }

    this.modalService.openModalDialogGiiw(configDialog)
      .afterClosed()
      .subscribe((rs) => {
        if (!rs) {
          this.financeiroService.limparPrecificacaoProduto(produto.id)
            .subscribe((rs: PrecificacaoProduto) => {
              if (!rs.valorProduto) {
                this.snakeBarService.openSnackBarSuccess("Precificação removida com sucesso!");
                this.filtrar();
              }
            })
        }

      })
  }

  public historico(produto: PrecificacaoProdutoListDTO) {
    this.financeiroService.getHistoricoPrecificacaoProduto(produto.idProduto)
      .subscribe((rs: PrecificacaoProdutoHistoricoDTO) => {
        if ((rs.historicoPrecificacao?.length || 0) > 0) {
          const dialogConfigPrecificacao = new MatDialogConfig();
          dialogConfigPrecificacao.disableClose = true;
          dialogConfigPrecificacao.width = '70%';
          dialogConfigPrecificacao.data = rs;

          this.modalService.openModal(HistoricoPrecificacaoComponent, dialogConfigPrecificacao);
        } else {
          this.snakeBarService.openSnackBarWarn("Produto não possui histórico de precificação.");
        }
      })
  }
}

