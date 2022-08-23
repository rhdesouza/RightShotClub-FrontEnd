import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { SnakeBarService } from 'src/app/common/snakebar/snakebar.service';
import { InfoRSC } from 'src/app/model/entity/InfoSRC';
import { FornecedorService } from 'src/app/pages/fornecedor/fornecedor.service';
import { AdmService } from '../adm.service';

@Component({
  selector: 'app-info-rsc',
  templateUrl: './info-rsc.component.html',
  styleUrls: ['./info-rsc.component.css']
})
export class InfoRscComponent implements OnInit {

  public infoSRCForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private admService: AdmService,
    private snackeService: SnakeBarService,
    private fornecedorService: FornecedorService
  ) { }

  ngOnInit(): void {
    this.createForm();
    this.getInfoSRC();
  }

  private createForm() {
    this.infoSRCForm = this.formBuilder.group({
      empresa: new FormGroup({
        id: new FormControl(null),
        cnpj: new FormControl(null, [Validators.required]),
        nomeEmpresa: new FormControl(null, [Validators.required]),
        nomeFantasia: new FormControl(null, [Validators.required]),
        telefone1: new FormControl(null, [Validators.required]),
        telefone2: new FormControl(null),
        emailEmpresa: new FormControl(null, [Validators.required, Validators.email]),

        cep: new FormControl(null),
        logradouro: new FormControl(null),
        numero: new FormControl(null),
        complemento: new FormControl(null),
        bairro: new FormControl(null),
        municipio: new FormControl(null),
        uf: new FormControl(null),

        socio1: new FormControl(null, [Validators.required]),
        emailSocio1: new FormControl(null, [Validators.required, Validators.email]),
        socio2: new FormControl(null),
        emailSocio2: new FormControl(null, [Validators.email]),
      }),
      financeiro: new FormGroup({
        markup: new FormControl(null),
      })
    });
  }

  private getInfoSRC() {
    this.admService.getInfoSRC().subscribe((rs: InfoRSC) => {
      this.infoSRCForm.get('empresa')?.get('id')?.setValue(rs.id);
      this.infoSRCForm.get('empresa')?.get('cnpj')?.setValue(rs.cnpj);
      this.infoSRCForm.get('empresa')?.get('nomeEmpresa')?.setValue(rs.nomeEmpresa);
      this.infoSRCForm.get('empresa')?.get('nomeFantasia')?.setValue(rs.nomeFantasia);
      this.infoSRCForm.get('empresa')?.get('telefone1')?.setValue(rs.telefone1);
      this.infoSRCForm.get('empresa')?.get('telefone2')?.setValue(rs.telefone2);
      this.infoSRCForm.get('empresa')?.get('emailEmpresa')?.setValue(rs.emailEmpresa);

      this.infoSRCForm.get('empresa')?.get('cep')?.setValue(rs.cep);
      this.infoSRCForm.get('empresa')?.get('logradouro')?.setValue(rs.logradouro);
      this.infoSRCForm.get('empresa')?.get('numero')?.setValue(rs.numero);
      this.infoSRCForm.get('empresa')?.get('bairro')?.setValue(rs.bairro);
      this.infoSRCForm.get('empresa')?.get('municipio')?.setValue(rs.municipio);
      this.infoSRCForm.get('empresa')?.get('uf')?.setValue(rs.uf);

      this.infoSRCForm.get('empresa')?.get('socio1')?.setValue(rs.socio1);
      this.infoSRCForm.get('empresa')?.get('emailSocio1')?.setValue(rs.emailSocio1);
      this.infoSRCForm.get('empresa')?.get('socio2')?.setValue(rs.socio2);
      this.infoSRCForm.get('empresa')?.get('emailSocio2')?.setValue(rs.emailSocio2);

      this.infoSRCForm.get('financeiro')?.get('markup')?.setValue(rs.markup);
    })
  }

  public saveInfo() {
    let info: InfoRSC = {
      id: this.infoSRCForm.get('empresa')?.get('id')?.value,
      cnpj: this.infoSRCForm.get('empresa')?.get('cnpj')?.value,
      nomeEmpresa: this.infoSRCForm.get('empresa')?.get('nomeEmpresa')?.value,
      nomeFantasia: this.infoSRCForm.get('empresa')?.get('nomeFantasia')?.value,
      telefone1: this.infoSRCForm.get('empresa')?.get('telefone1')?.value,
      telefone2: this.infoSRCForm.get('empresa')?.get('telefone2')?.value,
      emailEmpresa: this.infoSRCForm.get('empresa')?.get('emailEmpresa')?.value,

      cep: this.infoSRCForm.get('empresa')?.get('cep')?.value,
      logradouro: this.infoSRCForm.get('empresa')?.get('logradouro')?.value,
      numero: this.infoSRCForm.get('empresa')?.get('numero')?.value,
      complemento: this.infoSRCForm.get('empresa')?.get('complemento')?.value,
      bairro: this.infoSRCForm.get('empresa')?.get('bairro')?.value,
      municipio: this.infoSRCForm.get('empresa')?.get('municipio')?.value,
      uf: this.infoSRCForm.get('empresa')?.get('uf')?.value,

      socio1: this.infoSRCForm.get('empresa')?.get('socio1')?.value,
      emailSocio1: this.infoSRCForm.get('empresa')?.get('emailSocio1')?.value,
      socio2: this.infoSRCForm.get('empresa')?.get('socio2')?.value,
      emailSocio2: this.infoSRCForm.get('empresa')?.get('emailSocio2')?.value,

      //Financeiro
      markup: this.infoSRCForm.get('financeiro')?.get('markup')?.value
    }
    this.admService.saveInfoSRC(info).subscribe((rs: InfoRSC) => {
      if (!!rs.id) {
        this.snackeService.openSnackBarSuccess("Configuração salva com Sucesso!");
      } else
        this.snackeService.openSnackBarError("Ocorreu algum erro ao salvar a Configuraão");
    })
    /* console.log(this.infoSRCForm); */
  }

  public pesquisaCEP() {
    if ((this.infoSRCForm.get('empresa')?.get('cep')?.value).length == 8)
      this.fornecedorService.getEnderecoPorCep(this.infoSRCForm.get('empresa')?.get('cep')?.value)
        .subscribe((retorno: any) => {
        if (!!retorno) {

          this.infoSRCForm.get('empresa')?.get('logradouro')?.setValue(retorno['logradouro']);
          this.infoSRCForm.get('empresa')?.get('bairro')?.setValue(retorno['bairro']);
          this.infoSRCForm.get('empresa')?.get('municipio')?.setValue(retorno['localidade']);
          this.infoSRCForm.get('empresa')?.get('uf')?.setValue(retorno['uf']);
        }
      })
  }

  public getInfoSRCForm(control: string, campo: string): AbstractControl | any {
    return !!this.infoSRCForm.get(control) ?? this.infoSRCForm.get(control)?.get(campo)
  }

}
