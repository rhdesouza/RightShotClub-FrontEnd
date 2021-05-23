import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalService } from 'src/app/common/services/modal.service';
import { SnakeBarService } from 'src/app/common/snakebar/snakebar.service';
import { NotaFiscal } from 'src/app/model/entity/NotaFiscal';
import { NotaFiscalItens } from 'src/app/model/entity/NotaFiscalItens';
import { SituacaoNotaFiscal } from 'src/app/model/enum/SituacaoNotaFiscal';
import { SearchProdutoComponent } from 'src/app/pages/estoque/produto/search-produto/search-produto.component';
import { SearchFornecedoresComponent } from 'src/app/pages/fornecedor/search-fornecedores/search-fornecedores.component';
import { FinanceiroService } from '../../financeiro.service';
import { AddPagamentoNotaComponent } from '../add-pagamento-nota/add-pagamento-nota.component';

@Component({
  selector: 'app-add-nota-fiscal',
  templateUrl: './add-nota-fiscal.component.html',
  styleUrls: ['./add-nota-fiscal.component.css']
})
export class AddNotaFiscalComponent implements OnInit {
  public fornecedorRazaoSocial: string = '';
  /* public formaPagamento = Object.keys(FormaPagamento).filter(f => isNaN(Number(f))); */

  public formaPagamento = [{ option: 'A_Vista', desc: 'A Vista' }, { option: 'Parcelado', desc: 'Parcelado' }];

  public progressoNota: number = 0;
  public color: ThemePalette = this.progressoNota == 100 ? 'primary' : 'warn';

  public notaFiscalForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    private financeiroService: FinanceiroService,
    private snackeService: SnakeBarService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private modalService: ModalService
  ) {
    this.createNotaFiscalForm();
    this.progressoNotaBarra();
  }


  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      if (!!params.idNotaFiscal)
        this.setNotaFiscal(params.idNotaFiscal);
    });
  }

  private setNotaFiscal(idNotaFiscal: number) {
    this.financeiroService.getNotaFiscalId(idNotaFiscal).subscribe((rs: NotaFiscal) => {
      this.notaFiscalForm.get('cabecalho')?.get('id')?.setValue(rs.id);
      this.notaFiscalForm.get('cabecalho')?.get('numero')?.setValue(rs.numero);
      this.notaFiscalForm.get('cabecalho')?.get('fornecedor')?.setValue(rs.fornecedor.id);
      this.fornecedorRazaoSocial = rs.fornecedor.razaoSocial;
      this.notaFiscalForm.get('cabecalho')?.get('valorTotal')?.setValue(rs.valorTotal);
      this.notaFiscalForm.get('cabecalho')?.get('formaPagamento')?.setValue(rs.formaPagamento);
      this.notaFiscalForm.get('cabecalho')?.get('parcelas')?.setValue(rs.parcelas);
      this.notaFiscalForm.get('cabecalho')?.get('pagamento')?.setValue(rs.pagamento);
      this.notaFiscalForm.get('cabecalho')?.get('situacao')?.setValue(rs.situacao);

      this.itens.removeAt(0);
      rs.itens.forEach((x: NotaFiscalItens, i: number) => {
        let itensNota = this.createFormItens();
        itensNota.controls.id.setValue(x.id);
        itensNota.controls.produto.setValue(x.produto.id);
        itensNota.controls.codigoProduto.setValue(x.codigoProduto);
        itensNota.controls.descricaoProduto.setValue(x?.descricaoProduto);
        itensNota.controls.ncmSh.setValue(x.ncmSh);
        itensNota.controls.cst.setValue(x.cst);
        itensNota.controls.cfop.setValue(x.cfop);
        itensNota.controls.un.setValue(x.un);
        itensNota.controls.qtd.setValue(x.qtd);
        itensNota.controls.valorUnit.setValue(x.valorUnit);
        itensNota.controls.valorTotal.setValue(x.valorTotal);
        itensNota.controls.aliquitaIcms.setValue(x.aliquitaIcms);
        itensNota.controls.aliquitaIpi.setValue(x.aliquitaIpi);

        this.itens.push(itensNota);

      })
    })
  }

  private progressoNotaBarra() {
    this.notaFiscalForm.valueChanges.subscribe(rs => {
      let valorNota = 0;
      if (this.notaFiscalForm.get('cabecalho')?.get('numero')?.valid)
        valorNota += 20;

      if (this.notaFiscalForm.get('cabecalho')?.get('fornecedor')?.valid)
        valorNota += 20;

      if (this.notaFiscalForm.get('cabecalho')?.get('valorTotal')?.valid)
        valorNota += 20;

      if (this.notaFiscalForm.get('cabecalho')?.get('formaPagamento')?.valid)
        valorNota += 20;

      if (!this.notaFiscalForm.controls.itens.invalid)
        valorNota += 20;

      this.progressoNota = valorNota;
    })
  }

  private createNotaFiscalForm() {
    this.notaFiscalForm = this.formBuilder.group({
      cabecalho: new FormGroup({
        id: new FormControl(null),
        fornecedor: new FormControl('', [Validators.required]),
        numero: new FormControl('', [Validators.required, Validators.pattern("[0-9]+$")]),
        valorTotal: new FormControl(null, [Validators.required, Validators.min(0)]),
        formaPagamento: new FormControl('', [Validators.required]),
        parcelas: new FormControl(null, [Validators.required]),
        pagamento: new FormControl(null),
        situacao: new FormControl(SituacaoNotaFiscal[SituacaoNotaFiscal.Aberta], [Validators.required]),
      }),
      itens: this.formBuilder.array([
        this.createFormItens()
      ])
    });
  }

  private createFormItens() {
    return this.formBuilder.group({
      id: new FormControl(),
      produto: new FormControl("", [Validators.required]),
      codigoProduto: new FormControl("", [Validators.required]),
      descricaoProduto: new FormControl("", [Validators.required]),
      ncmSh: new FormControl("", [Validators.required]),
      cst: new FormControl("", [Validators.required]),
      cfop: new FormControl("", [Validators.required]),
      un: new FormControl("", [Validators.required]),
      qtd: new FormControl("", [Validators.required]),
      valorUnit: new FormControl(0, [Validators.required]),
      valorTotal: new FormControl("", [Validators.required]),
      aliquitaIcms: new FormControl("", [Validators.required]),
      aliquitaIpi: new FormControl("", [Validators.required]),
    })
  }

  get itens(): FormArray {
    return this.notaFiscalForm.get('itens') as FormArray;
  }

  public addItemNota() {
    this.itens.push(this.createFormItens());
  }

  public removeItemNota(item: any) {
    if (this.itens.length > 1)
      this.itens.removeAt(item);
  }

  public openSearchFornecedores() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.width = '60%';
    dialogConfig.data = this.notaFiscalForm.get('cabecalho')?.get('fornecedor')?.value;

    this.modalService.openModal(SearchFornecedoresComponent, dialogConfig)
      .afterClosed().subscribe(data => {
        if (data != 'error' && !!data && data != 'close') {
          this.notaFiscalForm.get('cabecalho')?.get('fornecedor')?.setValue(data?.id);
          this.fornecedorRazaoSocial = data?.razaoSocial;
        } else if (!data) {
          this.clearFornecedor();
        } else if (data == 'error' || data == 'close') {

        }
      })
  }

  public openDatasPagamentos() {

    if (!this.notaFiscalForm.get('cabecalho')?.get('valorTotal')?.value) {
      this.snackeService.openSnackBarInfo("Para cadastrar as parcelas é necessário cadastrar o valor total da Nota Fiscal.")
      return;
    }

    let objPagamento = {
      valorTotal: this.notaFiscalForm.get('cabecalho')?.get('valorTotal')?.value,
      pagamentos: this.notaFiscalForm.get('cabecalho')?.get('pagamento')?.value
    }

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.width = '40%';
    dialogConfig.data = objPagamento;

    const modal = this.dialog.open(AddPagamentoNotaComponent, dialogConfig)
      .afterClosed().subscribe(data => {
        if (data != 'error' && !!data) {
          this.notaFiscalForm.get('cabecalho')?.get('pagamento')?.setValue(data.pagamentos);
          this.notaFiscalForm.get('cabecalho')?.get('parcelas')?.setValue(data.pagamentos.length);

        } else if (!data) {
        } else if (data == 'error') {
        }
      })
  }

  public clearFornecedor() {
    this.notaFiscalForm.get('cabecalho')?.get('fornecedor')?.setValue(null);
    this.fornecedorRazaoSocial = '';
  }

  public getFornecedor() {
    let cabecalho: any = this.notaFiscalForm.controls.cabecalho;
    return !!cabecalho['controls'].fornecedor.value;
  }

  public getDadosCabecalho() {
    return this.notaFiscalForm.get('cabecalho');
  }

  public changeFormaPagamento() {
    if (this.notaFiscalForm.get('cabecalho')?.get('formaPagamento')?.value == "A_Vista")
      this.notaFiscalForm.get('cabecalho')?.get('parcelas')?.setValue(null);
  }

  /***
   * Funções para o GRID - ITENS
   */

  public openSearchProduto(index: number) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.width = '70%';
    dialogConfig.data = this.itens.controls[index].get('codigoProduto')?.value;

    this.modalService.openModal(SearchProdutoComponent, dialogConfig)
      .afterClosed().subscribe(data => {
        if (data != 'error' && !!data && data != 'close') {
          this.itens.controls[index].get('produto')?.setValue(data?.id);
          this.itens.controls[index].get('codigoProduto')?.setValue(data?.codProduto);
          this.itens.controls[index].get('descricaoProduto')?.setValue(`${data?.codProduto} - ${data?.descricao}`);
          this.itens.controls[index].get('ncmSh')?.setValue(data?.ncm?.ncm);
          this.itens.controls[index].get('un')?.setValue(data?.tipoProduto?.unidCompra);
        } else if (!data) {
          this.clearProduto(index);
        } else if (data == 'error' || data == 'close') {

        }
      })
  }

  public isButtonClearProduto(index: number): boolean {
    return !!this.itens.controls[index].get('codigoProduto')?.value;
  }

  public clearProduto(index: number) {
    this.itens.controls[index].get('codigoProduto')?.setValue(null);
    this.itens.controls[index].get('descricaoProduto')?.setValue(null);
    this.itens.controls[index].get('ncmSh')?.setValue(null);
    this.itens.controls[index].get('un')?.setValue(null);
  }

  public valorTotalRow(index: number) {
    let qtd: number = this.itens.controls[index].get('qtd')?.value;
    let valorUnit = this.itens.controls[index].get('valorUnit')?.value;
    let valorTotal = qtd * valorUnit;
    this.itens.controls[index].get('valorTotal')?.setValue(valorTotal);
  }

  public saveNotaFiscal() {
    if (this.notaFiscalForm.status == 'INVALID') {
      this.snackeService.openSnackBarWarn("Formulário precisa ser preenchido corretamente!");
      return;
    }
    if (!this.validarFormulario())
      return;

    this.financeiroService.saveNotaFiscal(this.conformidadeNotaFiscal())
      .subscribe((retorno: NotaFiscal) => {
        if (!!retorno.id) {
          this.snackeService.openSnackBarSuccess("Nota Fiscal salva com sucesso!");
          this.router.navigate(['/financeiro/nota-fiscal-list']);
        } else
          this.snackeService.openSnackBarError("Ocorreu algum erro ao salvar Nota Fiscal");
      })
  }

  private validarFormulario(): boolean {
    //Itens;
    let itens: NotaFiscalItens[] = this.notaFiscalForm.value.itens;
    let valorTotal: number = 0;
    itens.forEach(x => { valorTotal += x.valorTotal });
    if (this.notaFiscalForm.value.cabecalho.valorTotal != valorTotal) {
      this.snackeService.openSnackBarWarn("O valor da nota não corresponde a somatória dos itens.");
      return false;
    }
    return true
  }

  public conformidadeNotaFiscal() {
    let nf: NotaFiscal = {
      id: this.notaFiscalForm.value.cabecalho.id,
      fornecedor: this.notaFiscalForm.value.cabecalho.fornecedor,
      numero: this.notaFiscalForm.value.cabecalho.numero,
      valorTotal: this.notaFiscalForm.value.cabecalho.valorTotal,
      formaPagamento: this.notaFiscalForm.value.cabecalho.formaPagamento,
      parcelas: this.notaFiscalForm.value.cabecalho.parcelas,
      pagamento: this.notaFiscalForm.value.cabecalho.pagamento,
      situacao: this.notaFiscalForm.value.cabecalho.situacao,
      itens: this.notaFiscalForm.value.itens
    }
    return nf;
  }

  public fechar() {
    this.router.navigate(['/financeiro/nota-fiscal-list']);
  }

  public somaValorTotalNota(): string {
    let somaValor: number = 0;

    this.itens.controls.forEach(x => {
      //if (isNaN(x?.value?.valorTotal))
      //console.log(x?.value?.valorTotal);
      somaValor += x?.value?.valorTotal;
    })
    return somaValor.toString();
  }

  public isNotaFecahda(): boolean {
    return this.notaFiscalForm.get('cabecalho')?.get('situacao')?.value == 'Estoque';
  }
}