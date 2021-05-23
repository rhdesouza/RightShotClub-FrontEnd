import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ModuloEnum } from 'src/app/model/enum/Modulo.enum';
import { SubModuloEnum } from 'src/app/model/enum/SubModulo.enum';
import { ModuloAcaoEnum } from 'src/app/model/enum/ModuloAcao.enum';
import { AdmService } from '../../adm.service';


@Component({
  selector: 'app-add-role',
  templateUrl: './add-role.component.html',
  styleUrls: ['./add-role.component.css']
})
export class AddRoleComponent implements OnInit {
  public tituloModal = "Inlcuir ROLE";
  public roleForms!: FormGroup;

  public moduloList = Object.keys(ModuloEnum).filter(f => isNaN(Number(f)));
  public subModuloList = Object.keys(SubModuloEnum).filter(f => isNaN(Number(f)));
  public moduloAcaoList = Object.keys(ModuloAcaoEnum).filter(f => isNaN(Number(f)));

  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<AddRoleComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public idRole: number,
    private admService: AdmService
  ) {
    this.createRoleForms();
    this.removeAdminListRoles();
  }

  ngOnInit(): void {
  }

  private createRoleForms() {
    this.roleForms = this.formBuilder.group({
      modulo: new FormControl('', [Validators.required]),
      subModulo: new FormControl('', [Validators.required]),
      acao: new FormControl('', [Validators.required]),
      name: new FormControl('', Validators.required)
    });
  }

  public salvar() {
    this.admService.saveRoles(this.roleForms.value)
      .subscribe(retorno => {
        if (!!retorno.id)
          this.dialogRef.close(retorno);
        else
          this.dialogRef.close('error');
      })
  }
  
  public fechar() {
    this.dialogRef.close();
  }

  public createNameRole() {
    let name: string = '';
    let modulo: string = !!this.roleForms.get('modulo')?.value ? this.roleForms.get('modulo')?.value : null;
    let subModulo: string = !!this.roleForms.get('subModulo')?.value ? this.roleForms.get('subModulo')?.value : null;
    let acao: string = !!this.roleForms.get('acao')?.value ? this.roleForms.get('acao')?.value : null;

    if (!!modulo && !!subModulo && !!acao)
      name = `ROLE_${modulo}_${subModulo}_${acao}`;

    this.roleForms.get('name')?.setValue(name.toUpperCase());
  }

  private removeAdminListRoles(){
    this.moduloList.splice(this.moduloList.indexOf('ADMIN'),1);
    this.subModuloList.splice(this.subModuloList.indexOf('ADMIN'),1);
    this.moduloAcaoList.splice(this.moduloAcaoList.indexOf('ADMIN'),1);
  }

}
