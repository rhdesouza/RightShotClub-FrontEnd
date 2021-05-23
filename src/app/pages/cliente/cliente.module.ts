import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { IConfig, NgxMaskModule } from 'ngx-mask';
import { DirectivesModule } from 'src/app/common/directives/directives.module';
import { FormTitleBreadcrumbsModule } from 'src/app/common/form-title-breadcrumbs/form-title-breadcrumbs.module';
import { MatErrorMessageModule } from 'src/app/common/hint-errors-form/mat-error-message.module';
import { MaterialModule } from 'src/app/common/material.module';
import { CustomPipeModule } from 'src/app/common/pipes/custom-pipe.module';
import { TagFilterModule } from 'src/app/common/tagFilter/tag-filter.module';
import { TitlePageModalModule } from 'src/app/common/title-page-modal/title-page-modal.module';
import { Ng2FileModule } from '../../common/ng2-file-uploader/ng2-file-uploader.module';
import { templateModalModule } from '../../common/templateModal/templateModal.module';
import { AddClienteComponent } from './cliente-list/add-cliente/add-cliente.component';
import { ClienteListComponent } from './cliente-list/cliente-list.component';

const maskConfigFunction: () => Partial<IConfig> = () => {
  return {
    validation: false,
  };
};

@NgModule({
  declarations: [
    ClienteListComponent,
    AddClienteComponent
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
    Ng2FileModule,
    DirectivesModule,
    MatErrorMessageModule,
    TagFilterModule,
    TitlePageModalModule
  ],
  exports: [
  ],
})
export class ClienteModule { }
