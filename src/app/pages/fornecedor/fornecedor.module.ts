import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { IConfig, NgxMaskModule } from 'ngx-mask';
import { DirectivesModule } from 'src/app/common/directives/directives.module';
import { FormTitleBreadcrumbsModule } from 'src/app/common/form-title-breadcrumbs/form-title-breadcrumbs.module';
import { MatErrorMessageModule } from 'src/app/common/hint-errors-form/mat-error-message.module';
import { MaterialModule } from 'src/app/common/material.module';
import { TagFilterModule } from 'src/app/common/tagFilter/tag-filter.module';
import { TitlePageModalModule } from 'src/app/common/title-page-modal/title-page-modal.module';
import { CustomPipeModule } from '../../common/pipes/custom-pipe.module';
import { templateModalModule } from '../../common/templateModal/templateModal.module';
import { AddFornecedorComponent } from './fornecedor-list/add-fornecedor/add-fornecedor.component';
import { FornecedorListComponent } from './fornecedor-list/fornecedor-list.component';
import { SearchFornecedoresComponent } from './search-fornecedores/search-fornecedores.component';
const maskConfigFunction: () => Partial<IConfig> = () => {
  return {
    validation: true,
  };
};

@NgModule({
  declarations: [
    FornecedorListComponent,
    AddFornecedorComponent,
    SearchFornecedoresComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormTitleBreadcrumbsModule,
    ReactiveFormsModule,
    FormsModule,
    CurrencyMaskModule,
    templateModalModule,
    NgxMaskModule.forRoot(maskConfigFunction),
    CustomPipeModule,
    MaterialModule,
    DirectivesModule,
    MatErrorMessageModule,
    TagFilterModule,
    TitlePageModalModule
  ],
  exports: [
    SearchFornecedoresComponent
  ]
})
export class FornecedorModule { }
