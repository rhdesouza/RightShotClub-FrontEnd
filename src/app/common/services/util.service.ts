import { Injectable } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";
import { configDataModalDialog } from "../modal-dialog/template/dialog/template-modal-dialog/template-modal-dialog.component";
import { ModalService } from "./modal.service";

@Injectable({
    providedIn: 'root'
})
export class UtilService {

    constructor(
        private modalService: ModalService
    ) {

    }

    public verificaFormDirtyToClose(dialogRef: MatDialogRef<any>, formDirty: boolean) {
        let configDialog: configDataModalDialog = {
            titulo: "Atenção",
            mensagem: "Formulário alterado, deseja realmente fechar e descartar as atualizações?",
            labelBotao1: "Sim",
            labelBotao2: "Não",
        }
        if (formDirty) {
            this.modalService.openModalDialogGiiw(configDialog)
                .afterClosed()
                .subscribe((rs) => {
                    if (!rs)
                        dialogRef.close();
                })
        } else {
            dialogRef.close();
        }

    }


}