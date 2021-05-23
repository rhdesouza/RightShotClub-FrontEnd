import { ComponentType } from "@angular/cdk/portal";
import { Injectable } from "@angular/core";
import { MatDialog, MatDialogConfig, MatDialogRef } from "@angular/material/dialog";
import { configDataModalDialog, TemplateModalDialogComponent } from "../modal-dialog/template/dialog/template-modal-dialog/template-modal-dialog.component";

@Injectable({
    providedIn: 'root'
})
export class ModalService {
    private dialogConfigDefault = new MatDialogConfig();
    constructor(
        private dialog: MatDialog,
    ) {
        this.dialogConfigDefault.disableClose = true;
        this.dialogConfigDefault.width = '50%';
        this.dialogConfigDefault.panelClass = ""
    }

    openModal<T, D = any, R = any>(comp: ComponentType<T>, dialogConfig?: MatDialogConfig): MatDialogRef<T, R> {
        return this.dialog.open(comp, !!dialogConfig ? dialogConfig : this.dialogConfigDefault);
    }

    openModalDialogGiiw(data: configDataModalDialog): MatDialogRef<any> {
        let dialogConfigDialog = new MatDialogConfig();
        dialogConfigDialog.disableClose = true;
        dialogConfigDialog.width = '30%';
        dialogConfigDialog.data = data;

        return this.dialog.open(TemplateModalDialogComponent, dialogConfigDialog);
    }

}
