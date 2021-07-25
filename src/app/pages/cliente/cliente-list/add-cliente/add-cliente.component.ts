import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GaleriaFotosService } from 'src/app/common/galeria-fotos/galeria-fotos.service';
import { UtilService } from 'src/app/common/services/util.service';
import { GenericValidator } from 'src/app/common/validatorsForm/genericValitadors';
import { Cliente } from 'src/app/model/entity/Cliente';
import { environment } from 'src/environments/environment';
import { ConfigFileUploader, Ng2FileUploaderSerive } from '../../../../common/ng2-file-uploader/ng2-file-uploader.service';
import { ClienteService } from '../../cliente.service';


@Component({
  selector: 'app-add-cliente',
  templateUrl: './add-cliente.component.html',
  styleUrls: ['./add-cliente.component.css'],
})
export class AddClienteComponent implements OnInit {
  public tituloModal: string = "Incluir Cliente"
  public clienteForms!: FormGroup;

  public situacaoCliente = [
    { situacao: "Ativo" },
    { situacao: "Inativo" }
  ]

  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<AddClienteComponent>,
    private clienteService: ClienteService,
    @Optional() @Inject(MAT_DIALOG_DATA) public idCliente: number,
    private ng2File: Ng2FileUploaderSerive,
    private galeria: GaleriaFotosService,
    private utilService: UtilService
  ) {
    this.createForm();
    if (this.isEditar())
      this.getCliente();
  }

  ngOnInit(): void {
  }

  private createForm() {
    this.clienteForms = this.formBuilder.group({
      id: new FormControl(null),
      nome: new FormControl('', [Validators.required, Validators.minLength(7)]),
      cpf: new FormControl('', [GenericValidator.cpfValidator]),
      email: new FormControl('', Validators.email),
      dataNascimento: new FormControl('', [GenericValidator.dateValidValidator]),
      telefone: new FormControl(''),
      telefone2: new FormControl(''),

      cep: new FormControl(''),
      logradouro: new FormControl(''),
      numero: new FormControl(''),
      cidade: new FormControl(''),
      estado: new FormControl(''),
      pais: new FormControl('Brasil', Validators.required),

      situacao: new FormControl('Ativo', Validators.required)
    });
  }

  private getCliente() {
    this.clienteService.getClientePorId(this.idCliente)
      .subscribe((rs: Cliente) => {
        this.clienteForms.controls.id.setValue(rs.id);
        this.clienteForms.controls.nome.setValue(rs.nome);
        this.clienteForms.controls.cpf.setValue(rs.cpf);
        this.clienteForms.controls.email.setValue(rs.email);
        this.clienteForms.controls.dataNascimento.setValue(rs.dataNascimento);
        this.clienteForms.controls.telefone.setValue(rs.telefone);
        this.clienteForms.controls.telefone2.setValue(rs.telefone2);
        this.clienteForms.controls.cep.setValue(rs.cep);
        this.clienteForms.controls.logradouro.setValue(rs.logradouro);
        this.clienteForms.controls.numero.setValue(rs.numero);
        this.clienteForms.controls.cidade.setValue(rs.cidade);
        this.clienteForms.controls.estado.setValue(rs.estado);
        this.clienteForms.controls.pais.setValue(rs.pais);
        this.clienteForms.controls.situacao.setValue(rs.situacao);

      })

  }

  public salvar() {
    if (this.clienteForms.invalid)
      return

    this.clienteService.addCliente(this.clienteForms.value)
      .subscribe(retorno => {
        if (!!retorno.id)
          this.dialogRef.close(retorno);
        else
          this.dialogRef.close('error');
      })
  }

  public fechar() {
    this.utilService.verificaFormDirtyToClose(this.dialogRef, this.clienteForms.dirty);
  }

  public pesquisaCEP() {
    if ((this.clienteForms.controls.cep.value).length == 8)
      this.clienteService.getEnderecoPorCep(this.clienteForms.controls.cep.value).subscribe(retorno => {
        if (!!retorno) {
          this.clienteForms.controls.logradouro.setValue(retorno['logradouro']);
          this.clienteForms.controls.cidade.setValue(retorno['localidade']);
          this.clienteForms.controls.estado.setValue(retorno['uf']);
        }
      })
  }

  public isEditar(): boolean {
    if (!!this.idCliente) {
      this.tituloModal = "Editar Cliente";
      return true;
    }
    return false;
  }

  public uploadArquivo() {
    if (!!this.clienteForms.controls?.id?.value) {
      let config: ConfigFileUploader = {
        url: `${environment.API}clientes/setFotoCliente/${this.clienteForms.controls.id.value}`,
        /* subtraiQueueLimit: 2 */
      }
      this.ng2File.open(config);
    }
  }

  public visualizarImagem() {
    if (!this.clienteForms.controls.id.value)
      return;
    let congif = {
      pathGetAll: `clientes/getAllFotosCliente/${this.clienteForms.controls.id.value}`,
      pathDelete: `clientes/deleteFotoCliente`,
      pathDownload: ``
    }
    this.galeria.open(congif);
  }

  public mask = {
    guide: true,
    showMask: true,
    mask: [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/]
  };

}
