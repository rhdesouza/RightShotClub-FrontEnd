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
import { NgScrollbarModule } from 'ngx-scrollbar';
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
import { DashboardComponent } from './dashboard/dashboard.component';
import { AddNotaFiscalComponent } from './nota-fiscal/add-nota-fiscal/add-nota-fiscal.component';
import { AddPagamentoNotaComponent } from './nota-fiscal/add-pagamento-nota/add-pagamento-nota.component';
import { NotaFiscalListComponent } from './nota-fiscal/nota-fiscal-list/nota-fiscal-list.component';
import { AddPredicifacaoProdutoComponent } from './precificacao-produto/add-predicifacao-produto/add-predicifacao-produto.component';
import { HistoricoPrecificacaoComponent } from './precificacao-produto/historico-precificacao/historico-precificacao.component';
import { PrecificacaoProdutoListComponent } from './precificacao-produto/precificacao-produto-list/precificacao-produto-list.component';
import { VendaProdutoListComponent } from './venda-produto/venda-produto-list/venda-produto-list.component';
import { AddVendaProdutoComponent } from './venda-produto/add-venda-produto/add-venda-produto.component';
import { SearchProdutoPrecificadoComponent } from './venda-produto/search-produto-precificado/search-produto-precificado.component';

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
        securityRoles.ROLE_NOTAFISCAL,
        securityRoles.ROLE_PRECIFICACAO,
        securityRoles.ROLE_VENDA
      ]
    }
  },
  {
    path: 'nota-fiscal-list',
    canActivate: [AuthGuard],
    canLoad: [AuthGuard],
    data: {
      breadcrumb: 'Nota Fiscal',
      roles: [
        securityRoles.ROLE_ADMIN_ADMIN,
        securityRoles.ROLE_NOTAFISCAL,
      ]
    },
    children: [
      {
        path: '',
        component: NotaFiscalListComponent,
      },
      {
        path: 'add-nota-fiscal',
        component: AddNotaFiscalComponent,
        data: {
          breadcrumb: 'Incluir Nota Fiscal'
        },
      },
      {
        path: 'nota-fiscal/edit',
        component: AddNotaFiscalComponent,
        data: {
          breadcrumb: 'Editar Nota Fiscal'
        },
      }
    ]
  },
  {
    path: 'precificacao',
    component: PrecificacaoProdutoListComponent,
    canActivate: [AuthGuard],
    canLoad: [AuthGuard],
    data: {
      breadcrumb: 'Precificação de Produtos',
      roles: [
        securityRoles.ROLE_ADMIN_ADMIN,
        securityRoles.ROLE_PRECIFICACAO
      ]
    }
  },
  {
    path: 'vendas',
    component: VendaProdutoListComponent,
    canActivate: [AuthGuard],
    canLoad: [AuthGuard],
    data: {
      breadcrumb: 'Venda de Produtos',
      roles: [
        securityRoles.ROLE_ADMIN_ADMIN,
        securityRoles.ROLE_VENDA
      ]
    }
  },
]

const maskConfigFunction: () => Partial<IConfig> = () => {
  return {
      validation: false,
  };
};

@NgModule({
  declarations: [
    DashboardComponent,
    NotaFiscalListComponent,
    AddNotaFiscalComponent,
    AddPagamentoNotaComponent,
    PrecificacaoProdutoListComponent,
    AddPredicifacaoProdutoComponent,
    HistoricoPrecificacaoComponent,
    VendaProdutoListComponent,
    AddVendaProdutoComponent,
    SearchProdutoPrecificadoComponent,
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
    TitlePageModalModule,
    NgScrollbarModule
  ]
})
export class FinanceiroModule { }
