import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TitlePageModalComponent } from './title-page-modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material.module';

@NgModule({
  declarations: [
    TitlePageModalComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  exports:[
    TitlePageModalComponent
  ]
})
export class TitlePageModalModule { }
