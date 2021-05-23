import { Injectable } from "@angular/core";
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Ng2FileUploaderComponent } from './ng2-file-uploader.component';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class Ng2FileUploaderSerive {

    constructor(
        public dialog: MatDialog,
    ) {

    }

    /**
     * Componet de upload de arquivo.
     * @param idReferencia Id de referência para a tabela (idClente)
     */
    public open(config: ConfigFileUploader) {

        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = false;
        dialogConfig.width = '45%';
        dialogConfig.data = config;

        const modal = this.dialog.open(Ng2FileUploaderComponent, dialogConfig).beforeClosed()
            .subscribe(data => {
                return data;
            })
        return modal;
    }

}
export interface ConfigFileUploader {
    url: string,
    subtraiQueueLimit?: number
    allowedMimeType?: string[]
}