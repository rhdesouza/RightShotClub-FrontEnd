import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BreadcrumbModule } from 'xng-breadcrumb';
import { MaterialModule } from '../material.module';
import { FormTitleBreadcrumbsComponent } from './form-title-breadcrumbs.component';

@NgModule({
  declarations: [
    FormTitleBreadcrumbsComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    BreadcrumbModule
  ],
  exports:[
    FormTitleBreadcrumbsComponent
  ]

})
export class FormTitleBreadcrumbsModule { }
