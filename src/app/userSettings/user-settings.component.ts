import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { environment } from 'src/environments/environment';
import { Ng2FileUploaderComponent } from '../common/ng2-file-uploader/ng2-file-uploader.component';
import { ConfigFileUploader, Ng2FileUploaderSerive } from '../common/ng2-file-uploader/ng2-file-uploader.service';
import { LoginService } from '../login/login.service';

@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.css']
})
export class UserSettingsComponent implements OnInit {
  public tituloModal = "Informações do Usuário"
  public dataUser: any;
  public imageSRC: any;

  constructor(
    private loginService: LoginService,
    private spinner: NgxSpinnerService,
    private dialogRef: MatDialogRef<UserSettingsComponent>,
    private formBuilder: FormBuilder,
    private ng2File: Ng2FileUploaderSerive,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.getUserSettings();
  }

  public getUserSettings() {
    this.loginService.getUserSettings().subscribe(rs => {
      this.dataUser = rs;
      this.loginService.getUserId(this.dataUser?.id).subscribe(rs => {
        this.dataUser.data = rs?.data
        if (!!rs?.data)
          this.imageSRC = `data:${rs?.fileType};base64,${rs?.data}`;
      })
    })
  }

  public fechar() {
    this.dialogRef.close();
  }

  public parseArrayToStringAuthority(obj: []) {
    let valor = '';
    if (!!obj) {
      obj.forEach(x => {
        valor += `${x['authority']}; `
      })
    }
    return valor;
  }

  public parseArrayToStringRoles(obj: []) {
    let valor = '';
    if (!!obj) {
      obj.forEach(x => {
        valor += `${x['authority']}; `
      })
    }
    return valor;
  }

  public uploadArquivo() {

    if (!!this.imageSRC) {
      this.excluirArquivo(this.dataUser.id)
    } else if (!this.imageSRC) {
      this.openFileUploader();
    }

  }

  private openFileUploader() {
    let config: ConfigFileUploader = {
      url: `${environment.API}user/setFotoUsuario/${this.dataUser.id}`,
      subtraiQueueLimit: 1
    }

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.width = '45%';
    dialogConfig.data = config;

    const modal = this.dialog.open(Ng2FileUploaderComponent, dialogConfig).beforeClosed()
      .subscribe(rs => {
        this.getUserSettings();
      })
  }

  public excluirArquivo(idUser: number) {
    this.loginService.excluirArquivo(idUser).subscribe(rs => {
      if (!rs?.data)
        this.imageSRC = null
    })
  }

}
