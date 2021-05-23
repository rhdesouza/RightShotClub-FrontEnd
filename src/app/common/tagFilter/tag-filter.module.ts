import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TagFilterComponent } from './tag-filter.component';
import { MaterialModule } from '../material.module';

@NgModule({
  declarations: [
    TagFilterComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports:[
    TagFilterComponent
  ]

})
export class TagFilterModule { }
