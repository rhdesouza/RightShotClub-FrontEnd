import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FileUploadModule } from 'ng2-file-upload';
import { MaterialModule } from '../material.module';
import { Ng2FileUploaderComponent } from '../ng2-file-uploader/ng2-file-uploader.component';

@NgModule({
  declarations: [
    Ng2FileUploaderComponent
  ],
  imports: [
    CommonModule,
    FileUploadModule,
    MaterialModule,
  ],
  exports: [
    Ng2FileUploaderComponent
  ]
})
export class Ng2FileModule { }
