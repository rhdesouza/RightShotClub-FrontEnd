import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UtilService } from 'src/app/common/services/util.service';
import { TipoProduto } from 'src/app/model/entity/TipoProduto';
import { UnidadeTipoProduto } from 'src/app/model/enum/UnidadeTipoProduto';
import { EstoqueService } from '../../estoque.service';

@Component({
  selector: 'app-add-tipo-produto',
  templateUrl: './add-tipo-produto.component.html',
  styleUrls: ['./add-tipo-produto.component.css']
})
export class AddTipoProdutoComponent implements OnInit {
  public tituloModal: string = "Incluir Tipo Produto"
  public tipoProdutoForms!: FormGroup;
  public unidCompraEnum = Object.keys(UnidadeTipoProduto).filter(f => isNaN(Number(f)));


  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<AddTipoProdutoComponent>,
    private estoqueService: EstoqueService,
    @Optional() @Inject(MAT_DIALOG_DATA) public idTipoProduto: number,
    private utilService: UtilService
  ) {
    this.createForm();

    if (!!idTipoProduto) {
      this.tituloModal = 'Editar Tipo Produto';
      this.editForm(idTipoProduto);
    }
  }

  ngOnInit(): void {
  }

  private createForm() {
    this.tipoProdutoForms = this.formBuilder.group({
      tipo: new FormControl('', [Validators.required, Validators.minLength(5)]),
      unidCompra: new FormControl('', Validators.required),
      unidVenda: new FormControl('', Validators.required)
    });
  }

  public salvar() {
    if (this.tipoProdutoForms.invalid)
      return

    this.estoqueService.saveTipoProduto(this.tipoProdutoForms.value).subscribe((retorno: TipoProduto) => {
      if (!!retorno.id)
        this.dialogRef.close(retorno);
      else
        this.dialogRef.close('error');
    })
  }

  public editForm(idTipoProd: number) {
    this.estoqueService.getTipoProdutoId(idTipoProd)
      .subscribe((tipoProduto: TipoProduto) => {
        this.tipoProdutoForms.addControl('id', new FormControl(idTipoProd, Validators.required),)
        this.tipoProdutoForms.controls['tipo'].setValue(tipoProduto.tipo);
        this.tipoProdutoForms.controls['unidCompra'].setValue(tipoProduto.unidCompra);
        this.tipoProdutoForms.controls['unidVenda'].setValue(tipoProduto.unidVenda);
      })
  }

  public fechar() {
    this.utilService.verificaFormDirtyToClose(this.dialogRef, this.tipoProdutoForms.dirty);
  }




}
