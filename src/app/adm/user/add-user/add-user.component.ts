import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SituacaoUser } from 'src/app/model/enum/SituacaoUser.enum'
import { AdmService } from '../../adm.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  public tituloModal = "Incluir Usuários"
  public userForms!: FormGroup;

  public situacaoList = Object.keys(SituacaoUser).filter(f => isNaN(Number(f)));


  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<AddUserComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public idRole: number,
    private admService: AdmService
  ) {
    this.createUserForms();
  }

  ngOnInit(): void {
  }


  private createUserForms() {
    this.userForms = this.formBuilder.group({
      nomeCompleto: new FormControl('', [Validators.required]),
      user: new FormControl('', [Validators.required, Validators.minLength(5)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      situacao: new FormControl('', Validators.required),
    });

    this.userForms.get('situacao')?.setValue('AGUARDANDO_ATIVACAO');
  }

  public salvar() {
    this.admService.saveNewUser(this.userForms.value)
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

}
