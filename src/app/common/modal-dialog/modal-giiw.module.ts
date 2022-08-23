import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { MaterialModule } from '../material.module';
import { TemplateModalDialogComponent } from './template/dialog/template-modal-dialog/template-modal-dialog.component';

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
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ],
})
export class ModalDialogModule { }
