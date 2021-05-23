import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FileUploadModule } from 'ng2-file-upload';
import { MaterialModule } from '../../nav/material.module'
import { FormTitleModule } from '../form-title/form-title.module';
import {GaleriaFotosComponent} from '../galeria-fotos/galeria-fotos.component'

@NgModule({
  declarations: [
    GaleriaFotosComponent
  ],
  imports: [
    CommonModule,
    FileUploadModule,
    FormTitleModule,
    MaterialModule,
  ],
  exports: [
    GaleriaFotosComponent
  ]
})
export class GaleriaFotosModule { }
