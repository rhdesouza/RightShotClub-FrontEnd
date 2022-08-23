import { Component, Inject, OnInit, Optional, ViewChild } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
//import * as moment from 'moment';
import { ModalService } from 'src/app/common/services/modal.service';
import { UtilService } from 'src/app/common/services/util.service';
import { SnakeBarService } from 'src/app/common/snakebar/snakebar.service';
import { GenericValidator } from 'src/app/common/validatorsForm/genericValitadors';
import { PrecificacaoProdutoListDTO } from 'src/app/model/dto/PrecificacaoProdutoListDTO';
import { Cliente } from 'src/app/model/entity/Cliente';
import { Venda } from 'src/app/model/entity/Venda';
import { VendaItens } from 'src/app/model/entity/VendaItens';
import { SituacaoVendaEnum } from 'src/app/model/enum/SituacaoVenda.enum';
import { ClienteService } from 'src/app/pages/cliente/cliente.service';
import { SearchClientesComponent } from 'src/app/pages/cliente/search-clientes/search-clientes.component';
import { FinanceiroService } from '../../financeiro.service';
import { SearchProdutoPrecificadoComponent } from '../search-produto-precificado/search-produto-precificado.component';

@Component({
  selector: 'app-add-venda-produto',
  templateUrl: './add-venda-produto.component.html',
  styleUrls: ['./add-venda-produto.component.css']
})
export class AddVendaProdutoComponent implements OnInit {

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  private changedQuery: Boolean = false;
  public resultsLength = 0;
  public filterForm!: FormGroup;
  public tituloModal: String = "INCLUIR VENDA PRODUTO"


  public vendaForm!: FormGroup;
  public formaPagamento = [
    { option: 'A_VISTA', desc: 'A Vista' },
    { option: 'PARCELADO', desc: 'Parcelado' }
  ];

  constructor(
    @Optional() @Inject(MAT_DIALOG_DATA) public venda: Venda,
    private formBuilder: FormBuilder,
    private modalService: ModalService,
    private clienteService: ClienteService,
    private snackeBarService: SnakeBarService,
    private financeiroService: FinanceiroService,
    private dialogRef: MatDialogRef<AddVendaProdutoComponent>,
    private utilService: UtilService
  ) {
    this.createForm();
    if (this.isEditar())
      this.getVenda();
  }

  ngOnInit(): void {
  }

  public isEditar(): boolean {
    if (!!this.venda) {
      this.tituloModal = "VISUALIZAR VENDA";
      return true;
    }
    return false;
  }

  public getVenda() {
    this.vendaForm.controls['id'].setValue(this.venda.id);
    this.vendaForm.controls['cliente'].get('id')?.setValue(this.venda.cliente.id);
    this.vendaForm.controls['cliente'].get('cpf')?.setValue(this.venda.cliente.cpf);
    this.vendaForm.controls['cliente'].get('nome')?.setValue(this.venda.cliente.nome);
    this.vendaForm.controls['cliente'].get('email')?.setValue(this.venda.cliente.email);
    this.vendaForm.controls['formaPagamento'].setValue(this.venda.formaPagamento);

    this.vendaForm.controls['dataHoraVenda'].setValue('moment("" + this.venda.dataHoraVenda).format("DD/MM/YYYY HH:mm")');
    this.vendaForm.controls['valorTotalItens'].setValue(this.venda.valorTotalItens);
    this.vendaForm.controls['valorDescontoNota'].setValue(this.venda.valorDescontoNota);
    this.vendaForm.controls['valorTotalVenda'].setValue(this.venda.valorTotalVenda);

    this.itens.removeAt(0);
    this.venda.vendaItens.forEach((x: VendaItens, i: number) => {
      let itensVenda = this.createFormItens();
      itensVenda.controls['id'].setValue(x.id);
      itensVenda.controls['produto'].get('id')?.setValue(x.produto.id);
      itensVenda.controls['produto'].get('codProduto')?.setValue(x.produto.codProduto);
      itensVenda.controls['produto'].get('descricao')?.setValue(x.produto.descricao);
      itensVenda.controls['tipoUnidade'].setValue(x.tipoUnidade);
      itensVenda.controls['qtd'].setValue(x.qtd);
      itensVenda.controls['valorProduto'].setValue(x.valorProduto);
      itensVenda.controls['valorDesconto'].setValue(!x.valorDesconto ? 0 : x.valorDesconto);
      itensVenda.controls['valorVenda'].setValue(x.valorVenda);

      this.itens.push(itensVenda);
    })

    this.vendaForm.updateValueAndValidity();
    this.vendaForm.controls['vendaItens'].updateValueAndValidity();
    console.log(this.venda);
  }

  public createForm() {
    let dateTime = "moment(new Date()).format('DD/MM/YYYY HH:mm');"
    this.vendaForm = this.formBuilder.group({
      id: new FormControl(""),
      cliente: new FormGroup({
        id: new FormControl("", Validators.required),
        nome: new FormControl("", Validators.required),
        cpf: new FormControl("", [Validators.required, GenericValidator.validaCpfCnpj]),
        email: new FormControl("", [Validators.required, Validators.email]),
      }),
      formaPagamento: new FormControl("A_VISTA", Validators.required),
      dataHoraVenda: new FormControl(dateTime),
      valorTotalItens: new FormControl('', Validators.required),
      valorDescontoNota: new FormControl(''),
      valorTotalVenda: new FormControl('', Validators.required),
      vendaItens: this.formBuilder.array([
        this.createFormItens()
      ]),
      emailEnviado: new FormControl(""),
      situacaoVenda: new FormControl(SituacaoVendaEnum[0]),
    })
  }

  private createFormItens(produto?: PrecificacaoProdutoListDTO) {
    return this.formBuilder.group({
      id: new FormControl(),
      produto: new FormGroup({
        id: new FormControl(!!produto ? produto?.idProduto : null, [Validators.required]),
        codProduto: new FormControl(!!produto ? produto?.cod_produto : null, [Validators.required]),
        descricao: new FormControl(!!produto ? produto?.descricao : null, [Validators.required]),
      }),
      tipoUnidade: new FormControl(!!produto ? produto?.unid_venda : null, [Validators.required]),
      qtd: new FormControl("", [Validators.required]),
      valorProduto: new FormControl(!!produto ? produto?.valor_produto : null, [Validators.required]),
      valorDesconto: new FormControl(""),
      valorVenda: new FormControl(!!produto ? produto?.valor_produto : null, [Validators.required]),
    })
  }

  get itens(): FormArray {
    return this.vendaForm.get('vendaItens') as FormArray;
  }

  public addItemNota(produto?: PrecificacaoProdutoListDTO) {
    this.itens.push(this.createFormItens(produto));
  }

  public removeItemNota(item: any) {
    if (this.itens.length > 1)
      this.itens.removeAt(item);
  }

  public saveVenda() {
    if (this.vendaForm.valid)
      this.financeiroService.saveVenda(this.vendaForm.value).subscribe(rs => {
        if (!!rs.id) {
          this.dialogRef.close(rs);
        }
      })
  }

  public fechar() {
    this.utilService.verificaFormDirtyToClose(this.dialogRef, this.vendaForm.dirty);
  }

  public openSearchCliente() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.width = '60%';
    dialogConfig.data = this.vendaForm.get('cliente')?.get('id')?.value;

    this.modalService.openModal(SearchClientesComponent, dialogConfig)
      .afterClosed().subscribe((data: any) => {
        if (data != 'error' && !!data && data != 'close') {
          this.vendaForm.get('cliente')?.get('id')?.setValue(data.id);
          this.vendaForm.get('cliente')?.get('nome')?.setValue(data.nome);
          this.vendaForm.get('cliente')?.get('cpf')?.setValue(data.cpf);
          this.vendaForm.get('cliente')?.get('email')?.setValue(data.email);
          this.vendaForm.markAsDirty();
        } else if (!data) {
          this.vendaForm.get('cliente')?.reset();
        } else if (data == 'error' || data == 'close') {

        }
      })
  }

  public openSearchProdutoPrecificado(index: number) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.width = '80%';
    dialogConfig.data = this.itens.value;

    this.modalService.openModal(SearchProdutoPrecificadoComponent, dialogConfig)
      .afterClosed().subscribe((data: PrecificacaoProdutoListDTO[]) => {
        if (!!data) {
          data.forEach(x => {
            if (this.findIndexFormArray(x.idProduto) == -1) {
              if (data.length == 1) {
                this.itens.controls[index].get('produto')?.get('id')?.setValue(x.idProduto);
                this.itens.controls[index].get('produto')?.get('codProduto')?.setValue(x.cod_produto);
                this.itens.controls[index].get('produto')?.get('descricao')?.setValue(x.descricao);
                this.itens.controls[index].get('tipoUnidade')?.setValue(x.unid_venda);
                this.itens.controls[index].get('valorProduto')?.setValue(x.valor_produto);
              }
              else if (data.length > 0) {
                this.addItemNota(x);
              }
            }
          })
          this.limpaItensEmBranco();
        }
      })
  }

  private limpaItensEmBranco() {
    this.itens.controls.forEach((element, index) => {
      if (element.value.produto.id == null)
        this.removeItemNota(index);
    });
  }

  private findIndexFormArray(idProduto: number) {
    let arr: [] = this.itens.value;
    let indice: number = arr.findIndex(x => x['produto']?.['id'] == idProduto);
    return indice;
  }

  public buscarClientePorCpf() {
    this.clienteService.buscarClientePorCpf('asdasdasd').subscribe((rs: Cliente) => {
      if (!!rs) {
        this.vendaForm.get('cliente')?.get('id')?.setValue(rs.id);
        this.vendaForm.get('cliente')?.get('nome')?.setValue(rs.nome);
        this.vendaForm.get('cliente')?.get('cpf')?.setValue(rs.cpf);
        this.vendaForm.get('cliente')?.get('email')?.setValue(rs.email);
      }
    })
  }

  public valorTotalRow(index: number) {
    let qtd: number = this.itens.controls[index].get('qtd')?.value;
    let valorUnit = this.itens.controls[index].get('valorProduto')?.value;
    let valorDesc = this.itens.controls[index].get('valorDesconto')?.value;
    let valorTotal = (qtd * valorUnit) - valorDesc;
    this.itens.controls[index].get('valorVenda')?.setValue(valorTotal);

    this.atualizaValorTotalCabecalho();
  }

  public atualizaValorTotalCabecalho() {
    let valorTotaItens = 0;
    let valorTotaDesconto = 0;
    let valorTotaVenda = 0;

    this.itens.controls.forEach(x => {
      valorTotaItens += x?.value?.valorProduto;
      valorTotaDesconto += x?.value?.valorDesconto;
      valorTotaVenda += x?.value?.valorVenda;
    })

    this.vendaForm.get('valorTotalItens')?.setValue(valorTotaItens);
    this.vendaForm.get('valorDescontoNota')?.setValue(valorTotaDesconto);
    this.vendaForm.get('valorTotalVenda')?.setValue(valorTotaVenda);

  }

  public validaQuantitadeVendaEstoque(vendaItens: any) {
    let idProduto: number = vendaItens.value.produto.id;
    let qtd: number = vendaItens.value.qtd;
    this.financeiroService.validaQuantitadeVendaEstoque(idProduto, qtd).subscribe(x => {
      if (!x) {
        this.snackeBarService.openSnackBarInfo("Quantidade solicitada indisponível no estoque.");
        this.itens.controls
          .filter(x => x.value.produto.id == idProduto)
          .map(x => x.get('qtd')?.setValue(null));
      }
    })
  }

  public getVendaForm(campo: string): AbstractControl | any {
    return !!this.vendaForm.get('cliente') ?? this.vendaForm.get('cliente')?.get(campo)
  }
}