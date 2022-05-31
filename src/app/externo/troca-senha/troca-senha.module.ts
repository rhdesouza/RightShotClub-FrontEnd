import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { FormTitleBreadcrumbsModule } from 'src/app/common/form-title-breadcrumbs/form-title-breadcrumbs.module';
import { MatErrorMessageModule } from 'src/app/common/hint-errors-form/mat-error-message.module';
import { MaterialModule } from 'src/app/common/material.module';
import { Ng2FileModule } from 'src/app/common/ng2-file-uploader/ng2-file-uploader.module';
import { CustomPipeModule } from 'src/app/common/pipes/custom-pipe.module';
import { TrocaSenhaComponent } from './troca-senha.component';

@NgModule({
  declarations: [
    TrocaSenhaComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormTitleBreadcrumbsModule,
    ReactiveFormsModule,
    FormsModule,
    CurrencyMaskModule,
    CustomPipeModule,
    MaterialModule,
    Ng2FileModule,
    MatErrorMessageModule,
  ]
})
export class TrocaSenhaModule { }
