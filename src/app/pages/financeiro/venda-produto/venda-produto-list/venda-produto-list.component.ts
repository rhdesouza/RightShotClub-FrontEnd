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
import { GenericValidator } from 'src/app/common/validatorsForm/genericValitadors';
import { VendaPageableDTO } from 'src/app/model/dto/VendaPageableDTO';
import { Venda } from 'src/app/model/entity/Venda';
import { PageVO } from 'src/app/model/vo/pageVO';
import { FinanceiroService } from '../../financeiro.service';
import { AddVendaProdutoComponent } from '../add-venda-produto/add-venda-produto.component';


@Component({
  selector: 'app-venda-produto-list',
  templateUrl: './venda-produto-list.component.html',
  styleUrls: ['./venda-produto-list.component.css']
})
export class VendaProdutoListComponent implements OnInit {

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  public colunas: string[] = [
    'idVenda',
    'dataHoraVenda',
    'nome',
    'email',
    'acoes'
  ];

  private changedQuery: Boolean = false;
  public vendaList: VendaPageableDTO[] = [];
  public resultsLength = 0;
  public filterForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private financeiroService: FinanceiroService,
    private modalService: ModalService,
    private snakeBarService: SnakeBarService
  ) { }

  ngOnInit(): void {
    this.filterForm = this.formBuilder.group({
      nome: new FormControl(null, [Validators.minLength(5)]),
      idVenda: new FormControl(null, [Validators.pattern(/^[0-9]\d*$/)]),
      cpf: new FormControl(null, [GenericValidator.cpfValidator])
    })
  }

  public limparFiltro() {
    this.filterForm.reset();
    this.filtrar();
  }

  ngAfterViewInit() {
    merge(this.sort.sortChange, this.paginator.page, this.paginator.pageSize)
      .pipe(
        startWith({}),
        switchMap(() => {

          this.changedQuery = this.resultsLength == 0 ? true : false;

          return this.financeiroService.getAllVendaPageable(
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
        (data: VendaPageableDTO[]) => this.vendaList = data
      );
  }

  public filtrar() {
    if (!this.filterForm.valid)
      return;

    merge(this.filterForm.value)
      .pipe(
        take(0),
        startWith({}),
        switchMap(() => {
          this.changedQuery = true;

          return this.financeiroService.getAllVendaPageable(
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
        (data: VendaPageableDTO[]) => this.vendaList = data
      );
  }

  public adicionarVenda(venda?: Venda) {
    let dialogConfigDialog = new MatDialogConfig();
    dialogConfigDialog.disableClose = true;
    dialogConfigDialog.width = '100%';
    dialogConfigDialog.height = '100%';
    dialogConfigDialog.data = !!venda ? venda : null;

    this.modalService.openModal(AddVendaProdutoComponent, dialogConfigDialog)
      .afterClosed().subscribe(data => {
        if (data != 'error' && !!data) {
          this.filtrar();
          this.snakeBarService.openSnackBarSuccess("Registro salvo com sucesso!");
        } else if (data == 'error') {
          this.snakeBarService.openSnackBarError('Erro ao salvar registro.');
        }
      })
  }

  public enviarEmailVendaCliente(idVenda: Number) {
    this.financeiroService.enviaEmailVendaCliente(idVenda)
      .subscribe((x: Boolean) => {
        if (x)
          this.snakeBarService.openSnackBarSuccess("E-mail enviado com sucesso!");
        else
          this.snakeBarService.openSnackBarError("Ocorreu um erro ao enviar o e-mail, verifique o endereço do Cliente");

        this.vendaList.find(venda => venda.idVenda == idVenda)!.emailEnviado = x;
      })
  }

  public cancelarNotaCliente(idVenda: Number) {

    let configDialog: configDataModalDialog = {
      titulo: "Atenção",
      mensagem: `Confirma o cancelamento da venda: ${idVenda}`,
      labelBotao1: "Sim",
      labelBotao2: "Não",
    }

    this.modalService.openModalDialogGiiw(configDialog)
      .afterClosed()
      .subscribe((rs) => {
        if (!rs) {
          this.financeiroService.cancelaNotaVenda(idVenda)
            .subscribe((x: Number) => {
              if (x == 1)
                this.snakeBarService.openSnackBarSuccess("Venda cancelada com sucesso");

              this.vendaList.find(venda => venda.idVenda == idVenda)!.situacaoVenda = x;
            })
        }
      })
  }

  public visualizar(idVenda: number) {
    this.financeiroService.buscaVendaPorId(idVenda).subscribe((venda: Venda) => {
      this.adicionarVenda(venda);
    })
  }

}
