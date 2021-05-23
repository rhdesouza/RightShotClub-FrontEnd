import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TemplateModal } from './templateModal.component';

@NgModule({
  declarations: [
    TemplateModal
  ],
  imports: [
    CommonModule
  ],
  exports:[
    TemplateModal
  ]
})
export class templateModalModule { }
