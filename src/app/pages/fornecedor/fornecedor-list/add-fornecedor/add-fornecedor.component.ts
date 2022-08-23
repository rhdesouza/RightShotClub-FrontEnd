import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UtilService } from 'src/app/common/services/util.service';
import { GenericValidator } from 'src/app/common/validatorsForm/genericValitadors';
import { Fornecedor } from 'src/app/model/entity/Fornecedor';
import { FornecedorService } from '../../fornecedor.service';

@Component({
  selector: 'app-add-fornecedor',
  templateUrl: './add-fornecedor.component.html',
  styleUrls: ['./add-fornecedor.component.css']
})
export class AddFornecedorComponent implements OnInit {
  public tituloModal: string = "Incluir Fornecedor"
  public fornecedorForms!: FormGroup;

  public situacaoFornecedor = [
    { situacao: "Ativo" },
    { situacao: "Inativo" }
  ]


  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<AddFornecedorComponent>,
    private fornecedorService: FornecedorService,
    @Optional() @Inject(MAT_DIALOG_DATA) public idFornecedor: number,
    private utilService: UtilService
  ) {
    this.createForm();
    if (this.isEditar())
      this.getFornecedorPorId();
  }

  ngOnInit(): void {
  }

  private createForm() {
    this.fornecedorForms = this.formBuilder.group({
      id: new FormControl(''),
      razaoSocial: new FormControl('', [Validators.required]),
      nomeFantasia: new FormControl('', [Validators.required]),
      cep: new FormControl(''),
      logradouro: new FormControl(''),
      numero: new FormControl(''),
      cidade: new FormControl(''),
      estado: new FormControl(''),
      pais: new FormControl('Brasil', [Validators.required]),
      cpfCnpj: new FormControl('', [Validators.required, GenericValidator.validaCpfCnpj, Validators.minLength(11)]),
      inscricaoMunicipal: new FormControl(''),
      inscricaoEstadual: new FormControl(''),
      iss: new FormControl(''),
      email: new FormControl('', Validators.email),
      telefone: new FormControl(''),
      telefone2: new FormControl(''),
      telefone3: new FormControl(''),
      codBanco: new FormControl(''),
      agencia: new FormControl(''),
      conta: new FormControl(''),
      contatoNome: new FormControl(''),
      contatoCargo: new FormControl(''),
      contatoEmail: new FormControl('', Validators.email),
      contatoTelefone: new FormControl(''),
      contatoTelefone2: new FormControl(''),
      contatoTelefone3: new FormControl(''),
      situacao: new FormControl('Ativo', Validators.required)
    })
  }

  private getFornecedorPorId() {
    this.fornecedorService.getFornecedorPorId(this.idFornecedor)
      .subscribe((rs: Fornecedor) => {
        this.fornecedorForms.patchValue(rs);
      });
  }

  public salvar() {
    if (this.fornecedorForms.invalid)
      return

    this.fornecedorService.addFornecedor(this.fornecedorForms.value)
      .subscribe(retorno => {
        if (!!retorno.id)
          this.dialogRef.close(retorno);
        else
          this.dialogRef.close('error');
      })
  }

  public fechar() {
    this.utilService.verificaFormDirtyToClose(this.dialogRef, this.fornecedorForms.dirty);
  }

  public pesquisaCEP() {
    if ((this.fornecedorForms.controls['cep'].value).length == 8)
      this.fornecedorService.getEnderecoPorCep(this.fornecedorForms.controls['cep'].value)
        .subscribe((retorno: any) => {
          if (!!retorno) {
            this.fornecedorForms.controls['logradouro'].setValue(retorno['logradouro']);
            this.fornecedorForms.controls['cidade'].setValue(retorno['localidade']);
            this.fornecedorForms.controls['estado'].setValue(retorno['uf']);
            this.fornecedorForms.controls['pais'].setValue("Brasil");
          }
        })
  }

  public isEditar(): boolean {
    if (!!this.idFornecedor) {
      this.tituloModal = "Editar Fornecedor";
      return true;
    }
    return false;
  }
}
