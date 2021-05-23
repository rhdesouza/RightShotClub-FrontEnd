import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfigFileUploader, Ng2FileUploaderSerive } from 'src/app/common/ng2-file-uploader/ng2-file-uploader.service';
import { SnakeBarService } from 'src/app/common/snakebar/snakebar.service';
import { environment } from 'src/environments/environment';
import { EstoqueService } from '../estoque.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public isUploaderNcm!: boolean;

  constructor(
    private router: Router,
    private fileUploader: Ng2FileUploaderSerive,
    private estoqueService: EstoqueService,
    private snakeBarService: SnakeBarService

  ) { }

  ngOnInit(): void {
  }

  public cadastroNotaFiscal() {
    this.router.navigate(["estoque/nota-fiscal-list"]);
  }

  public cadastroProduto() {
    this.router.navigate(["estoque/produto-list"]);
  }

  public cadastroTipoProduto() {
    this.router.navigate(["estoque/tipo-produto-list"]);
  }

  public abrirEstoque(){
    this.router.navigate(["estoque/estoque-sintetico-list"]);
  }

  public uploadNcm() {
    this.estoqueService.isUploadNcm().subscribe(rs => {
      if (!rs) {
        this.snakeBarService.openSnackBarError('Arquivo carregado anteriormente.');
        return;
      } else {
        let config: ConfigFileUploader = {
          url: `${environment.API}ncm/setArquivoNcm`,
          subtraiQueueLimit: 1,
          allowedMimeType: ["text/plain", "text/html", "text/css", "text/javascript"]
        }
        this.fileUploader.open(config);
      }
    });
  }

  private isUploaderNcmService() {
    let retorno;
    this.estoqueService.isUploadNcm().subscribe(rs => {
      retorno = rs;
    });
    console.log(retorno);
    return retorno;
  }

}
