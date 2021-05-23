import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-template-modal-dialog',
  templateUrl: './template-modal-dialog.component.html',
  styleUrls: ['./template-modal-dialog.component.css']
})
export class TemplateModalDialogComponent implements OnInit {
  public titulo: string = '';
  public mensagem: string = '';
  public labelBotao1: string = '';
  public labelBotao2: string = '';

  constructor(
    private dialogRef: MatDialogRef<TemplateModalDialogComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public objData: configDataModalDialog,
  ) { }

  ngOnInit(): void {
    this.titulo = !!this.objData.titulo ? this.objData.titulo : "Atenção!";
    this.mensagem = !!this.objData.mensagem ? this.objData.mensagem : "Atenção!";
    this.labelBotao1 = !!this.objData.labelBotao1 ? this.objData.labelBotao1 : "Fechar";
    this.labelBotao2 = !!this.objData.labelBotao2 ? this.objData.labelBotao2 : "Confirmar";
  }

  public fechar() {
    this.dialogRef.close(false);
  }

  public salvar() {
    this.dialogRef.close(true);
  }

}

export interface configDataModalDialog {
  titulo?: string,
  mensagem: string,
  labelBotao1?: string,
  labelBotao2?: string,
}