import { Component, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { configDataModalDialog } from '../modal-dialog/template/dialog/template-modal-dialog/template-modal-dialog.component';
import { ModalService } from '../services/modal.service';

@Component({
  selector: 'app-title-page-modal',
  templateUrl: './title-page-modal.component.html',
  styleUrls: ['./title-page-modal.component.css']
})
export class TitlePageModalComponent implements OnInit {

  @Input() tituloModal: String = "Modal sem título";
  @Input() formsDirty: Boolean = false;

  constructor(
    private dialog: MatDialog,
    private modalService: ModalService
  ) { }

  ngOnInit(): void {
  }

  public fecharModal() {
    let configDialog: configDataModalDialog = {
      titulo: "Atenção",
      mensagem: "Formulário alterado, deseja realmente fechar e descartar as atualizações?",
      labelBotao1: "Sim",
      labelBotao2: "Não",
    }
    if (this.formsDirty) {
      this.modalService.openModalDialogGiiw(configDialog)
        .afterClosed()
        .subscribe((rs) => {
          if (!rs)
            this.dialog.openDialogs[this.dialog.openDialogs.length - 1].close();
        })
    } else {
      this.dialog.openDialogs[this.dialog.openDialogs.length - 1].close();
    }
  }

}
