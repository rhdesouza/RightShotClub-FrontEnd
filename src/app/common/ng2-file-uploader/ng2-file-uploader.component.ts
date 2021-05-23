import { Component, Optional, Inject, OnInit } from '@angular/core';
import { FileUploader, FileItem } from 'ng2-file-upload';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { environment } from 'src/environments/environment';
import { StorageComponent } from '../httpService/storage.component';
import { RestService } from '../httpService/httpService.component';
import { TipoRequisicaoRestEnum } from 'src/app/model/enum/tipo-requisicao-rest.enum';
import { SnakeBarService } from '../snakebar/snakebar.service';
import { ConfigFileUploader } from './ng2-file-uploader.service';

/* const URL = 'https://evening-anchorage-3159.herokuapp.com/api/'; */
/* const URL = `${environment.API}/clientes/addFoto` */
/* const URL = `${environment.API}clientes/upload` */

@Component({
  selector: 'app-ng2-file-uploader',
  templateUrl: './ng2-file-uploader.component.html',
  styleUrls: ['./ng2-file-uploader.component.css']
})
export class Ng2FileUploaderComponent implements OnInit {

  uploader: FileUploader;
  hasBaseDropZoneOver: boolean;
  hasAnotherDropZoneOver: boolean;
  response: string;

  public allowedMimeType: string[] | undefined = ['image/png', 'image/gif', 'video/mp4', 'image/jpeg'];
  public maxFileSize = 5 * 1024 * 1024;
  public queueLimit = 3;

  constructor(
    private dialogRef: MatDialogRef<Ng2FileUploaderComponent>,
    private storage: StorageComponent,
    @Optional() @Inject(MAT_DIALOG_DATA) public parameter: ConfigFileUploader,
    private rest: RestService,
    private snakeBarService: SnakeBarService,
  ) {
    this.allowedMimeType = this.parameter?.allowedMimeType!.length > 0 ? this.parameter!.allowedMimeType : this.allowedMimeType;
    this.uploader = new FileUploader({
      maxFileSize: this.maxFileSize,
      queueLimit: !!this.parameter?.subtraiQueueLimit ? this.queueLimit - this.parameter?.subtraiQueueLimit : this.queueLimit,
      url: this.parameter.url,
      headers: [{ name: 'Authorization', value: this.storage.getToken() }],
      disableMultipart: false, // 'DisableMultipart' must be 'true' for formatDataFunction to be called.
      allowedMimeType: this.allowedMimeType,
    });

    this.hasBaseDropZoneOver = false;
    this.hasAnotherDropZoneOver = false;
    this.response = '';

    this.uploader.response.subscribe(res => {
      this.response = res;
      if (this.response.indexOf("erro:1") != -1) {
        this.snakeBarService.openSnackBarError(this.response.split("msg:")[1]);
      }
    });

    
    this.getArquivos();
  }
  ngOnInit(): void {

    this.uploader.onWhenAddingFileFailed = (item, filter) => {
      let message = '';
      switch (filter.name) {
        case 'queueLimit':
          if (!!this.parameter?.subtraiQueueLimit)
            message = `Você ja possui ${this.parameter?.subtraiQueueLimit}, você poderá fazer o updload de ${this.queueLimit - this.parameter?.subtraiQueueLimit} arquvios`;
          else
            message = 'Permitido o envio de no máximo ' + this.queueLimit + ' arquivos';
          break;
        case 'fileSize':
          message = 'O arquivo ' + item.name + ' possui ' + this.formatBytes(item.size) + ' que ultrapassa o tamanho máximo permitido de ' + this.formatBytes(this.maxFileSize);
          break;
        default:
          message = 'Erro tentar incluir o arquivo';
          break;
      }

      this.snakeBarService.openSnackBarInfo(message);
    };

    /*     this.uploader.onAfterAddingFile = (fileItem: FileItem) => {
          console.log(this.uploader.queue);
          if (this.uploader.queue.length > 0) {
            this.uploader.queue = [fileItem];
          }
        }; */

  }
  private formatBytes(bytes, decimals?) {
    if (bytes == 0) return '0 Bytes';
    const k = 1024,
      dm = decimals || 2,
      sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
      i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }

  public fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
    this.onFileSelected()
  }

  public fileOverAnother(e: any): void {
    this.hasAnotherDropZoneOver = e;
    this.onFileSelected()
  }

  public fechar() {
    this.dialogRef.close();
  }

  public getArquivos() {
    this.rest.gerarSolicitacao(TipoRequisicaoRestEnum.GET, `clientes/getAllFotosCliente/1`).subscribe(rs => {
    })
  }
  onFileSelected() {
    console.log(this.uploader.queue);
  }

}
