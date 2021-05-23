import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SnakeBarService } from 'src/app/common/snakebar/snakebar.service';
import { NotaFiscalPagamento } from 'src/app/model/entity/NotaFiscalPagamento';


@Component({
  selector: 'app-add-pagamento-nota',
  templateUrl: './add-pagamento-nota.component.html',
  styleUrls: ['./add-pagamento-nota.component.css']
})
export class AddPagamentoNotaComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<AddPagamentoNotaComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public objPagamento: any,
    private snackeService: SnakeBarService
  ) {
    this.createPagamentosForm()
  }

  ngOnInit(): void {
    if (!!this.objPagamento.pagamentos && this.objPagamento.pagamentos.length > 0)
      this.setDadosPagamentoNotaFiscal();
  }
  public pagamentoForm!: FormGroup;

  private createPagamentosForm() {
    this.pagamentoForm = this.formBuilder.group({
      pagamentos: this.formBuilder.array([
        this.createFormPagamentos()
      ])
    });
    this.atualizaParcelas();
  }

  private createFormPagamentos() {
    return this.formBuilder.group({
      id: new FormControl(),
      parcela: new FormControl("", [Validators.required]),
      valorTotal: new FormControl("", [Validators.required]),
      dataPagamento: new FormControl("", [Validators.required]),
    })
  }

  get pagamentos(): FormArray {
    return this.pagamentoForm.get('pagamentos') as FormArray;
  }

  public addPagamentos() {
    this.pagamentos.push(this.createFormPagamentos());
    this.atualizaParcelas();
  }

  public removeItemPagamentos(item: any) {
    if (this.pagamentos.length > 1)
      this.pagamentos.removeAt(item);
    this.atualizaParcelas();
  }

  public atualizaParcelas() {
    this.pagamentos.controls.forEach((x, i) => {
      x.get("parcela")?.setValue(i + 1);
    });
  }

  public salvar() {
    if (!this.validarFormulario())
      return;
    this.dialogRef.close(this.pagamentoForm.value);
  }

  private validarFormulario(): boolean {
    //Itens;
    let itens: NotaFiscalPagamento[] = this.pagamentoForm.get("pagamentos")?.value;
    let valorTotal: number = 0;
    itens.forEach(x => { valorTotal += x.valorTotal });
    if (this.objPagamento.valorTotal != valorTotal) {
      this.snackeService.openSnackBarWarn("A somatória das parcelas não correspondem ao valor total da nota.");
      return false;
    }
    return true
  }

  private setDadosPagamentoNotaFiscal() {
    let pagamentos: NotaFiscalPagamento[] = this.objPagamento.pagamentos;
    this.pagamentos.removeAt(0);
    pagamentos.forEach((p: NotaFiscalPagamento) => {
      let itensNota = this.createFormPagamentos();
      itensNota.controls.id.setValue(p.id);
      itensNota.controls.parcela.setValue(p.parcela);
      itensNota.controls.valorTotal.setValue(p.valorTotal);
      itensNota.controls.dataPagamento.setValue(p.dataPagamento);

      this.pagamentos.push(itensNota);
    })
  }

  public somaValorTotalNota(): string {
    let itens: NotaFiscalPagamento[] = this.pagamentoForm.get("pagamentos")?.value;
    let somaValor: number = 0;

    itens.forEach(x => {
      somaValor += x.valorTotal;
    })
    return somaValor.toString();
  }
}
