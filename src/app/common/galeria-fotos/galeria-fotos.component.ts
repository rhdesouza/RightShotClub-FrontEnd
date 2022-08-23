import { Component, OnInit, Optional, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RestService } from '../httpService/httpService.component';
import { TipoRequisicaoRestEnum } from 'src/app/model/enum/tipo-requisicao-rest.enum';
//import { identifierModuleUrl } from '@angular/compiler';
import { SnakeBarService } from '../snakebar/snakebar.service';
import { ConfigGaleria } from './galeria-fotos.service';

@Component({
  selector: 'app-galeria-fotos',
  templateUrl: './galeria-fotos.component.html',
  styleUrls: ['./galeria-fotos.component.css']
})
export class GaleriaFotosComponent implements OnInit {

  public imagens : any[] = [];
  public tamanhoCols: any;

  constructor(
    /* private formBuilder: FormBuilder, */
    private dialogRef: MatDialogRef<GaleriaFotosComponent>,
    /* private clienteService: ClienteService, */
    @Optional() @Inject(MAT_DIALOG_DATA) public configGaleria: ConfigGaleria,
    private rest: RestService,
    private snakeBarService: SnakeBarService
  ) {
    this.rest.gerarSolicitacao(TipoRequisicaoRestEnum.GET, this.configGaleria.pathGetAll).subscribe(rs => {
      this.imagens = rs;
      for (var index in this.imagens) {
        this.imagens[index].src = `data:${this.imagens[index].fileType};base64,${this.imagens[index].data}`;
        this.imagens[index].size = this.formatBytes(this.imagens[index].size);
        this.imagens[index].drop = false;
      }
      if (this.imagens.length == 0) {
        this.snakeBarService.openSnackBarInfo("Não existem imagens para visualização");
        this.fechar();
      }
    })
  }
  /* this.imagem = 'data:image/png;base64,' + rs.data; */

  ngOnInit(): void {

  }

  private formatBytes(bytes: any, decimals?: any) {
    if (bytes == 0) return '0 Bytes';
    const k = 1024,
      dm = decimals || 2,
      sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
      i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }

  public deleteImagem(id: number) {
    this.rest.gerarSolicitacao(TipoRequisicaoRestEnum.DELETE, `${this.configGaleria.pathDelete}/${id}`).subscribe(rs => {

      for (var index in this.imagens) {
        if (this.imagens[index].id == id)
          this.imagens[index].drop = true;
      }
      if (this.imagens.filter(x => x.drop == false).length == 0) {
        this.snakeBarService.openSnackBarInfo('Todas as imagens foram apagadas.');
        this.fechar();
      } else {
        this.snakeBarService.openSnackBarInfo('Imagem apagada.');
      }
    })
  }

  public fechar() {
    this.dialogRef.close();
  }


  public isButtonApagar(): boolean {
    return !!this.configGaleria?.pathDelete;
  }

  public isButtonDownload(): boolean {
    return !!this.configGaleria?.pathDownload;
  }

}
