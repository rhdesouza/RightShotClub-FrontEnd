import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-venda-produto',
  templateUrl: './add-venda-produto.component.html',
  styleUrls: ['./add-venda-produto.component.css']
})
export class AddVendaProdutoComponent implements OnInit {

  public vendaForm!: FormGroup;
  public formaPagamento = [{ option: 'A_Vista', desc: 'A Vista' }, { option: 'Parcelado', desc: 'Parcelado' }];

  constructor(
    private formBuilder: FormBuilder,
  ) {
    this.createForm();
  }

  ngOnInit(): void {
  }

  public createForm() {
    this.vendaForm = this.formBuilder.group({
      id: new FormControl(""),
      cliente: new FormControl("", Validators.required),
      formaPagamento: new FormControl("", Validators.required),
      dataHoraVenda: new FormControl({value: '', disabled: true}),
      valorTotalItens: new FormControl({value: '', disabled: true}, Validators.required),
      valorDescontoNota: new FormControl({value: '1500', disabled: true}),
      valorTotalVenda: new FormControl({value: '', disabled: true}, Validators.required),
      vendaItens: this.formBuilder.array([
        this.createFormItens()
      ]),
      emailEnviado: new FormControl("", Validators.required),
    })
  }

  private createFormItens() {
    return this.formBuilder.group({
      id: new FormControl(),
      produto: new FormControl("", [Validators.required]),
      tipoUnidade: new FormControl("", [Validators.required]),
      qtd: new FormControl("", [Validators.required]),
      valorProduto: new FormControl("", [Validators.required]),
      valorDesconto: new FormControl("", [Validators.required]),
      valorVenda: new FormControl("", [Validators.required]),
    })
  }

  get itens(): FormArray {
    return this.vendaForm.get('vendaItens') as FormArray;
  }

  public addItemNota() {
    this.itens.push(this.createFormItens());
  }

  public openSearchClientes(){
  }

  public saveVenda(){}


}
