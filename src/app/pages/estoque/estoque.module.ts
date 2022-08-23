import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatRippleModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { RouterModule, Routes } from '@angular/router';
import { NgChartsModule } from 'ng2-charts';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { IConfig, NgxMaskModule } from 'ngx-mask';
import { AuthGuard } from 'src/app/common/AuthGuard/AuthGuard.component';
import { securityRoles } from 'src/app/common/constantes/security-roles';
import { FormTitleBreadcrumbsModule } from 'src/app/common/form-title-breadcrumbs/form-title-breadcrumbs.module';
import { MatErrorMessageModule } from 'src/app/common/hint-errors-form/mat-error-message.module';
import { MaterialModule } from 'src/app/common/material.module';
import { Ng2FileModule } from 'src/app/common/ng2-file-uploader/ng2-file-uploader.module';
import { CustomPipeModule } from 'src/app/common/pipes/custom-pipe.module';
import { TagFilterModule } from 'src/app/common/tagFilter/tag-filter.module';
import { templateModalModule } from 'src/app/common/templateModal/templateModal.module';
import { TitlePageModalModule } from 'src/app/common/title-page-modal/title-page-modal.module';
import { DashboardComponent } from '../estoque/dashboard/dashboard.component';
import { EstoqueSinteticoListComponent } from './estoque-sintetico/estoque-sintetico-list/estoque-sintetico-list.component';
import { AddProdutoComponent } from './produto/add-produto/add-produto.component';
import { ProdutoListComponent } from './produto/produto-list/produto-list.component';
import { SearchProdutoComponent } from './produto/search-produto/search-produto.component';
import { AddTipoProdutoComponent } from './tipo-produto/add-tipo-produto/add-tipo-produto.component';
import { TipoProdutoListComponent } from './tipo-produto/tipo-produto-list/tipo-produto-list.component';

const routes: Routes = [
    {
        path: '',
        component: DashboardComponent,
        canActivate: [AuthGuard],
        canLoad: [AuthGuard],
        data: {
            breadcrumb: 'Dashboard',
            roles: [
                securityRoles.ROLE_ADMIN_ADMIN,
                securityRoles.ROLE_ESTOQUE,
            ]
        }
    },
    {
        path: 'produto-list',
        component: ProdutoListComponent,
        canActivate: [AuthGuard],
        canLoad: [AuthGuard],
        data: {
            breadcrumb: 'Produto',
            roles: [
                securityRoles.ROLE_ADMIN_ADMIN,
                securityRoles.ROLE_PRODUTO,
            ]
        }

    },
    {
        path: 'tipo-produto-list',
        component: TipoProdutoListComponent,
        canActivate: [AuthGuard],
        canLoad: [AuthGuard],
        data: {
            breadcrumb: 'Tipo Produto',
            roles: [
                securityRoles.ROLE_ADMIN_ADMIN,
                securityRoles.ROLE_TIPOPRODUTO,
            ]
        }

    },
    {
        path: 'estoque-sintetico-list',
        component: EstoqueSinteticoListComponent,
        canActivate: [AuthGuard],
        canLoad: [AuthGuard],
        data: {
            breadcrumb: 'Estoque Sintético',
            roles: [
                securityRoles.ROLE_ADMIN_ADMIN,
                securityRoles.ROLE_ESTOQUE,
            ]
        }
    },
];

const maskConfigFunction: () => Partial<IConfig> = () => {
    return {
        validation: false,
    };
};

@NgModule({
    declarations: [
        DashboardComponent,
        TipoProdutoListComponent,
        AddTipoProdutoComponent,
        ProdutoListComponent,
        AddProdutoComponent,
        SearchProdutoComponent,
        EstoqueSinteticoListComponent,
    ],
    imports: [
        RouterModule.forChild(routes),
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
        NgChartsModule,
        MatRippleModule,
        MatDialogModule,
        Ng2FileModule,
        MatErrorMessageModule,
        TagFilterModule,
        TitlePageModalModule
    ],
    exports: [

    ],
})
export class EstoqueModule {

}