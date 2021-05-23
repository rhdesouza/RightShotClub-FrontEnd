import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../material.module';
import { MatErrorMessageComponent } from './mat-error-message.component';

@NgModule({
  declarations: [
    MatErrorMessageComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule
  ],
  exports: [
    MatErrorMessageComponent
  ]

})
export class MatErrorMessageModule { }
