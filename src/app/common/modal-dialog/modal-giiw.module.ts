import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TemplateModalDialogComponent } from './template/dialog/template-modal-dialog/template-modal-dialog.component';
import { MaterialModule } from '../material.module';

@NgModule({
  declarations: [
    TemplateModalDialogComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [
    TemplateModalDialogComponent
  ]
})
export class ModalDialogModule { }
