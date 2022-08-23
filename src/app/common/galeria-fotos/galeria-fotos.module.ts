import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { FileUploadModule } from 'ng2-file-upload';
import { GaleriaFotosComponent } from '../galeria-fotos/galeria-fotos.component';
import { MaterialModule } from '../material.module';

@NgModule({
  declarations: [
    GaleriaFotosComponent
  ],
  imports: [
    CommonModule,
    FileUploadModule,
    MaterialModule,
  ],
  exports: [
    GaleriaFotosComponent
  ]
})
export class GaleriaFotosModule { }
