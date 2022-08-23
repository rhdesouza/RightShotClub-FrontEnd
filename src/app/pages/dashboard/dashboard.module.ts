import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgChartsModule } from 'ng2-charts';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { IConfig, NgxMaskModule } from 'ngx-mask';
import { FormTitleBreadcrumbsModule } from 'src/app/common/form-title-breadcrumbs/form-title-breadcrumbs.module';
import { MaterialModule } from 'src/app/common/material.module';
import { CustomPipeModule } from '../../common/pipes/custom-pipe.module';
import { templateModalModule } from '../../common/templateModal/templateModal.module';
import { DashboardComponent } from '../dashboard/dashboard.component';

const maskConfigFunction: () => Partial<IConfig> = () => {
    return {
        validation: false,
    };
};

@NgModule({
    declarations: [
        DashboardComponent
    ],
    imports: [
        CommonModule,
        HttpClientModule,
        ReactiveFormsModule,
        FormsModule,
        CurrencyMaskModule,
        templateModalModule,
        NgxMaskModule.forRoot(maskConfigFunction),
        CustomPipeModule,
        MaterialModule,
        NgChartsModule,
        RouterModule,
        FormTitleBreadcrumbsModule,
    ],
    exports: [
    ]
})
export class DashboardModule { }
