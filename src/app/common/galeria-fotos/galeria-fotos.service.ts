import { Injectable } from "@angular/core";
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { GaleriaFotosComponent } from "./galeria-fotos.component";

@Injectable({
    providedIn: 'root'
})
export class GaleriaFotosService {

    constructor(
        public dialog: MatDialog,
    ) {

    }

    /**
    * Função para abrir a galeria de fotos.
    * 
    * @param config
    */
    public open(config: ConfigGaleria) {
        const galeriaFotos = new MatDialogConfig();
        galeriaFotos.disableClose = false;
        galeriaFotos.width = '50%';
        /* galeriaFotos.height = '75%'; */
        galeriaFotos.data = config;

        const modal = this.dialog.open(GaleriaFotosComponent, galeriaFotos)
            .afterClosed().subscribe(data => {

            });
    }

}

export interface ConfigGaleria {
    pathGetAll: string;
    pathDelete: string;
    pathDownload: string;
}
