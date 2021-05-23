import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { UtilService } from 'src/app/common/services/util.service';
import { SnakeBarService } from 'src/app/common/snakebar/snakebar.service';
import { Ncm } from 'src/app/model/entity/Ncm';
import { Produto } from 'src/app/model/entity/Produto';
import { TipoProduto } from 'src/app/model/entity/TipoProduto';
import { EstoqueService } from '../../estoque.service';

@Component({
  selector: 'app-add-produto',
  templateUrl: './add-produto.component.html',
  styleUrls: ['./add-produto.component.css']
})
export class AddProdutoComponent implements OnInit {

  public tituloModal: String = "Incluir Produto";
  public produtoForm!: FormGroup;
  public tipoProdutoList!: TipoProduto[];

  public options!: Ncm[];
  filteredOptions!: Observable<Ncm[]>;

  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<AddProdutoComponent>,
    private estoqueService: EstoqueService,
    @Optional() @Inject(MAT_DIALOG_DATA) public idProduto: number,
    private snakeBarService: SnakeBarService,
    private utilService: UtilService
  ) {
    this.createForm();
    this.carregarTipoProdutoList();

    if (!!idProduto) {
      this.tituloModal = 'Editar Produto';
      this.editForm(idProduto);
    }
  }

  ngOnInit(): void {
    this.filteredOptions = this.produtoForm.valueChanges.pipe(
      startWith(''),
      /* debounceTime(500), */
      map(value => this._filter(value?.ncm))
    );
  }

  private _filter(value: string): Ncm[] {
    const filterValue = !!value ? value.toLowerCase() : value;
    if (!!value) {
      this.estoqueService.getNcmPorId(value).subscribe((rs: Ncm[]) => {
        this.options = rs;
      })
    }
    return this.options;
  }

  public validarNcm(): boolean {
    let valid = !!this.options.find(x => x.ncm == this.produtoForm.controls.ncm.value);
    if (!valid) {
      this.produtoForm.controls.ncm.setValue(null);
      this.snakeBarService.openSnackBarError('Código NCM inválido');
    }
    return valid;
  }

  private carregarTipoProdutoList() {
    this.estoqueService.getAllTipoProduto().subscribe((tipoProduto: TipoProduto[]) => {
      this.tipoProdutoList = tipoProduto;
    })
  }

  private createForm() {
    this.produtoForm = this.formBuilder.group({
      codProduto: new FormControl('', [Validators.required, Validators.minLength(3)]),
      descricao: new FormControl('', [Validators.required, Validators.minLength(5)]),
      tipoProduto: new FormControl('', Validators.required),
      estoqueMinimo: new FormControl('',Validators.pattern("[0-9]+$")),
      ncm: new FormControl('', Validators.required),
    });
  }

  public salvar() {
    if (this.produtoForm.invalid)
      return

    if (this.validarNcm()) {
      this.estoqueService.saveProduto(this.produtoForm.value).subscribe((retorno: Produto) => {
        if (!!retorno.id)
          this.dialogRef.close(retorno);
        else
          this.dialogRef.close('error');
      })
    }
  }

  private editForm(idProduto: number) {
    let tipoProduto: TipoProduto | number;
    let ncm: Ncm | string;
    this.estoqueService.getProdutoPorId(idProduto).subscribe((produto: Produto) => {
      this.produtoForm.addControl('id', new FormControl(idProduto, Validators.required),)
      this.produtoForm.controls.codProduto.setValue(produto.codProduto);
      this.produtoForm.controls.descricao.setValue(produto.descricao);
      this.produtoForm.controls.estoqueMinimo.setValue(produto.estoqueMinimo);

      if (!!produto.tipoProduto) {
        tipoProduto = produto.tipoProduto;
        this.produtoForm.controls.tipoProduto.setValue(tipoProduto['id']);
      }

      if (!!produto.ncm){
        ncm = produto.ncm;
        this.produtoForm.controls.ncm.setValue(ncm['ncm']);
      }
    })
  }

  public fechar() {
    this.utilService.verificaFormDirtyToClose(this.dialogRef, this.produtoForm.dirty);
  }

}
