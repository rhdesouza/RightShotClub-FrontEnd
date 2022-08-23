import { Component, Inject, OnInit, Optional } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UtilService } from 'src/app/common/services/util.service';
import { GenericValidator } from 'src/app/common/validatorsForm/genericValitadors';
import { PrecificacaoProdutoDTO } from 'src/app/model/dto/PrecificacaoProdutoDTO';
import { PrecificacaoProduto } from 'src/app/model/entity/PrecificacaoProduto';
import { FinanceiroService } from '../../financeiro.service';

@Component({
  selector: 'app-add-predicifacao-produto',
  templateUrl: './add-predicifacao-produto.component.html',
  styleUrls: ['./add-predicifacao-produto.component.css']
})
export class AddPredicifacaoProdutoComponent implements OnInit {

  public precificacaoForm!: FormGroup;

  constructor(
    private financeiroService: FinanceiroService,
    @Optional() @Inject(MAT_DIALOG_DATA) public idProduto: number,
    private dialogRef: MatDialogRef<AddPredicifacaoProdutoComponent>,
    private formBuilder: FormBuilder,
    private utilService: UtilService
  ) {
    this.createForm();
    this.getPrecificacaoProduto();
  }

  ngOnInit(): void {
  }

  private createForm() {
    this.precificacaoForm = this.formBuilder.group({
      produto: new FormGroup({
        id: new FormControl(""),
        codProduto: new FormControl(""),
        descricao: new FormControl(""),
        unidCompra: new FormControl(""),
        unidVenda: new FormControl(""),
        estoqueMinimo: new FormControl(""),
      }),
      valorMedioPorProdutoVO: new FormGroup({
        idProduto: new FormControl(""),
        totalQtd: new FormControl(""),
        sumValorTotal: new FormControl(""),
        valorMedio: new FormControl(""),
        markupRSC: new FormControl(""),
        valorSugerido: new FormControl(""),
      }),
      precificacaoProduto: new FormGroup({
        id: new FormControl(""),
        produto: new FormControl(""),
        markupReferncia: new FormControl(""),
        valorMedioNF: new FormControl(""),
        valorProdutoSugerido: new FormControl(""),
        valorProduto: new FormControl(null, [Validators.required]),
      })
    })
  }

  private getPrecificacaoProduto() {
    this.financeiroService.getPrecificacaoProduto(this.idProduto)
      .subscribe((rs: PrecificacaoProdutoDTO) => {
        this.precificacaoForm.controls['produto'].get('id')?.setValue(rs.produto.id);
        this.precificacaoForm.controls['produto'].get('codProduto')?.setValue(rs.produto?.codProduto);
        this.precificacaoForm.controls['produto'].get('descricao')?.setValue(rs.produto?.descricao);
        this.precificacaoForm.controls['produto'].get('unidCompra')?.setValue(rs.produto?.tipoProduto['unidCompra']);
        this.precificacaoForm.controls['produto'].get('unidVenda')?.setValue(rs.produto?.tipoProduto['unidVenda']);

        if (!!rs.valorMedioPorProdutoVO) {
          this.precificacaoForm.controls['valorMedioPorProdutoVO'].get('idProduto')?.setValue(rs.valorMedioPorProdutoVO?.idProduto);
          this.precificacaoForm.controls['valorMedioPorProdutoVO'].get('totalQtd')?.setValue(rs.valorMedioPorProdutoVO?.totalQtd);
          this.precificacaoForm.controls['valorMedioPorProdutoVO'].get('sumValorTotal')?.setValue(rs.valorMedioPorProdutoVO?.sumValorTotal);
          this.precificacaoForm.controls['valorMedioPorProdutoVO'].get('valorMedio')?.setValue(rs.valorMedioPorProdutoVO?.valorMedio);

          this.precificacaoForm.controls['precificacaoProduto'].get('valorProduto')?.setValidators(
            GenericValidator.valMinFinanceiro(rs.valorMedioPorProdutoVO?.valorMedio)
          )

          this.precificacaoForm.controls['valorMedioPorProdutoVO'].get('markupRSC')?.setValue(rs.valorMedioPorProdutoVO?.markupRSC);
          this.precificacaoForm.controls['valorMedioPorProdutoVO'].get('valorSugerido')?.setValue(rs.valorMedioPorProdutoVO?.valorSugerido);
        }

        if (!!rs.precificacaoProduto) {
          this.precificacaoForm.controls['precificacaoProduto'].get('id')?.setValue(rs.precificacaoProduto.id);
          this.precificacaoForm.controls['precificacaoProduto'].get('produto')?.setValue(rs.precificacaoProduto.produto.id);
          this.precificacaoForm.controls['precificacaoProduto'].get('markupReferncia')?.setValue(rs.precificacaoProduto?.markupReferncia);
          this.precificacaoForm.controls['precificacaoProduto'].get('valorMedioNF')?.setValue(rs.precificacaoProduto?.valorMedioNF);
          this.precificacaoForm.controls['precificacaoProduto'].get('valorProdutoSugerido')?.setValue(rs.precificacaoProduto?.valorProdutoSugerido);
          this.precificacaoForm.controls['precificacaoProduto'].get('valorProduto')?.setValue(rs.precificacaoProduto?.valorProduto);
        } else {
          this.precificacaoForm.controls['precificacaoProduto'].get('produto')?.setValue(rs.produto.id);
        }
      })
  }

  public fechar() {
    this.utilService.verificaFormDirtyToClose(this.dialogRef, this.precificacaoForm.dirty);
  }

  public salvar() {
    if (!this.precificacaoForm.valid)
      return;

    this.financeiroService.savePrecificacaoProduto(this.precificacaoForm.get('precificacaoProduto')?.value)
      .subscribe((rs: PrecificacaoProduto) => {
        if (rs.id) {
          this.dialogRef.close(rs);
        }
      })
  }

  public getPrecificacaoForm(control: string, campo: string): AbstractControl | any {
    return !!this.precificacaoForm.get(control) ?? this.precificacaoForm.get(control)?.get(campo)
  }
}
