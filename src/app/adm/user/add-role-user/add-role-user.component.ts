import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Role } from 'src/app/model/entity/Role';
import { User } from 'src/app/model/entity/User';
import { AdmService } from '../../adm.service';


@Component({
  selector: 'app-add-role-user',
  templateUrl: './add-role-user.component.html',
  styleUrls: ['./add-role-user.component.css']
})
export class AddRoleUserComponent implements OnInit {
  public roleUserForms!: FormGroup;
  public rolesSelected: Role[] = [];
  public roleList: Role[] = [];
  public controleSelecaoT1pT2: Role[] = [];
  public controleSelecaoT2pT1: Role[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<AddRoleUserComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public idUser: number,
    private admService: AdmService
  ) {
    this.createUserForms();
    this.getAllRoles();
    this.getUserPorId(this.idUser);
  }

  ngOnInit(): void {
  }

  private createUserForms() {
    this.roleUserForms = this.formBuilder.group({
      id: new FormControl('', [Validators.required]),
      nomeCompleto: new FormControl('', [Validators.required]),
      user: new FormControl('', [Validators.required, Validators.min(5)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      situacao: new FormControl('', Validators.required),
      roles: new FormControl('')
    });
  }

  public getUserPorId(idUser: number) {
    this.admService.getUserPorId(idUser)
      .subscribe((retorno: User) => {
        this.roleUserForms.controls.id.setValue(retorno.id);
        this.roleUserForms.controls.nomeCompleto.setValue(retorno.nomeCompleto);
        this.roleUserForms.controls.user.setValue(retorno.user);
        this.roleUserForms.controls.email.setValue(retorno.email);
        this.roleUserForms.controls.situacao.setValue(retorno.situacao);
        this.rolesSelected = retorno.roles;
        this.retiraRolesSelecioandas(retorno.roles);
        this.ordenaT2();
      })
  }

  private getAllRoles() {
    this.admService.getAllRoles().subscribe((retorno) => {
      this.roleList = retorno;
    })
  }

  private retiraRolesSelecioandas(roles: Role[]) {
    if (roles?.length == 0 || roles?.length == null)
      return;

    roles.forEach(role => {
      this.roleList.splice(this.roleList.findIndex(x => x.authority == role.authority), 1);
    })

  }

  public salvar() {
    this.roleUserForms.controls.roles.setValue(this.rolesSelected)
    this.admService.saveRoleUser(this.roleUserForms.value)
      .subscribe(retorno => {
        if (!!retorno.id)
          this.dialogRef.close(retorno);
        else
          this.dialogRef.close('error');
      })
  }

  public fechar() {
    this.dialogRef.close()
  }

  public selecionar(row: any) {
    if (!this.isRoleSelecionada(row)) {
      this.rolesSelected.push(row)
    } else {
      console.log(this.rolesSelected, this.rolesSelected.findIndex(x => x.id === row.id), row.id);
      this.rolesSelected.splice(this.rolesSelected.findIndex(x => x.id === row.id), 1);
    }
  }

  public isRoleSelecionada(row: Role): Boolean {
    return !!this.rolesSelected.find(x => x.id === row.id);
  }

  /**
   * 
   * @param event Evento de Arrastar de T1pT2 ou de T2pT1
   */
  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }

  /**
   * Insere todos os registros de T1pT2
   */
  public setAllRoles() {
    this.roleList.forEach(role => {
      this.rolesSelected.push(role);
    })

    this.roleList = [];
    this.controleSelecaoT1pT2 = [];
    this.ordenaT2();
  }

  /**
  * Insere todos os registros de T2pT1
  */
  public removeAllRolesSelected() {
    this.rolesSelected.forEach(role => {
      this.roleList.push(role);
    })
    this.rolesSelected = [];
    this.controleSelecaoT2pT1 = [];
    this.ordenaT1();
  }

  /**
   * Ordena T1 em ordem crescente
   */
  private ordenaT1() {
    this.roleList.sort(function (a, b) {
      if (a.authority > b.authority) {
        return 1;
      }
      if (a.authority < b.authority) {
        return -1;
      }
      return 0;
    })
  }

  /**
  * Ordena T2 em ordem crescente
  */
  private ordenaT2() {
    this.rolesSelected.sort(function (a, b) {
      if (a.authority > b.authority) {
        return 1;
      }
      if (a.authority < b.authority) {
        return -1;
      }
      return 0;
    })
  }

  public selectT1(role: Role) {
    if (!!this.controleSelecaoT1pT2.find(x => x.authority == role.authority)) {
      this.controleSelecaoT1pT2.splice(this.controleSelecaoT1pT2.findIndex(x => x.id === role.id), 1);
    } else {
      this.controleSelecaoT1pT2.push(role);
    }
  }

  public isSelectT1(role: Role) {
    return !!this.controleSelecaoT1pT2.find(x => x.authority == role.authority)
  }

  public transferSelectT1pT2() {
    this.controleSelecaoT1pT2.forEach(role => {
      if (!this.rolesSelected.find(x => x.id == role.id)) {
        this.rolesSelected.push(role);
        this.roleList.splice(this.roleList.findIndex(x => x.id === role.id), 1);
      }
    })
    this.controleSelecaoT1pT2 = [];

    this.ordenaT2();
  }

  public selectT2(role: Role) {
    if (!!this.controleSelecaoT2pT1.find(x => x.authority == role.authority)) {
      this.controleSelecaoT2pT1.splice(this.controleSelecaoT2pT1.findIndex(x => x.id === role.id), 1);
    } else {
      this.controleSelecaoT2pT1.push(role);
    }
  }

  public isSelectT2(role: Role) {
    return !!this.controleSelecaoT2pT1.find(x => x.authority == role.authority)
  }

  public transferSelectT2pT1() {
    this.controleSelecaoT2pT1.forEach(role => {
      if (!this.roleList.find(x => x.id == role.id)) {
        this.roleList.push(role);
        this.rolesSelected.splice(this.rolesSelected.findIndex(x => x.id === role.id), 1);
      }
    })
    this.controleSelecaoT2pT1 = [];
    this.ordenaT1();
  }

  public roleListFiltrada: Role[] = [];

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.roleListFiltrada = this.roleList.filter(x=> x.authority.toUpperCase().indexOf(filterValue.toUpperCase()) > 0 );
    console.log(this.roleListFiltrada);
  }
}
