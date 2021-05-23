import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { RouterModule, Routes } from '@angular/router';
import { IConfig, NgxMaskModule } from 'ngx-mask';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { AuthGuard } from '../common/AuthGuard/AuthGuard.component';
import { securityRoles } from '../common/constantes/security-roles';
import { FormTitleBreadcrumbsModule } from '../common/form-title-breadcrumbs/form-title-breadcrumbs.module';
import { MatErrorMessageModule } from '../common/hint-errors-form/mat-error-message.module';
import { MaterialModule } from '../common/material.module';
import { CustomPipeModule } from '../common/pipes/custom-pipe.module';
import { TagFilterModule } from '../common/tagFilter/tag-filter.module';
import { templateModalModule } from '../common/templateModal/templateModal.module';
import { AdmComponent } from './adm.component';
import { InfoRscComponent } from './info-rsc/info-rsc.component';
import { AddRoleComponent } from './role/add-role/add-role.component';
import { RoleListComponent } from './role/role-list/role-list.component';
import { AddRoleUserComponent } from './user/add-role-user/add-role-user.component';
import { AddUserComponent } from './user/add-user/add-user.component';
import { UserListComponent } from './user/user-list/user-list.component';

const routes: Routes = [
  {
    path: '',
    component: AdmComponent,
    canActivate: [AuthGuard],
    canLoad: [AuthGuard],
    data: {
      breadcrumb: 'Administração Right Shot Club',
      roles: [
        securityRoles.ROLE_ADMIN_ADMIN,
      ]
    }
  },
  {
    path: 'user-list',
    component: UserListComponent,
    canActivate: [AuthGuard],
    canLoad: [AuthGuard],
    data: {
      breadcrumb: 'Lista de Usuários',
      roles: [
        securityRoles.ROLE_ADMIN_ADMIN,
      ]
    }
  },
  {
    path: 'roles-list',
    component: RoleListComponent,
    canActivate: [AuthGuard],
    canLoad: [AuthGuard],
    data: {
      breadcrumb: 'Lista de ROLES',
      roles: [
        securityRoles.ROLE_ADMIN_ADMIN,
      ]
    }
  },
  {
    path: 'info-rsc',
    component: InfoRscComponent,
    canActivate: [AuthGuard],
    canLoad: [AuthGuard],
    data: {
      breadcrumb: 'Informações Gerenciais RIGHT SHOT CLUB',
      roles: [
        securityRoles.ROLE_ADMIN_ADMIN,
      ]
    }
  }
]

const maskConfigFunction: () => Partial<IConfig> = () => {
  return {
      validation: true,
  };
};

@NgModule({
  declarations: [
    AdmComponent,
    AddRoleComponent,
    AddUserComponent,
    AddRoleUserComponent,
    RoleListComponent,
    UserListComponent,
    InfoRscComponent,
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    templateModalModule,
    CustomPipeModule,
    MatDialogModule,
    MaterialModule,
    FormTitleBreadcrumbsModule,
    TagFilterModule,
    MatErrorMessageModule,
    NgxMaskModule.forRoot(maskConfigFunction),
    NgScrollbarModule,
    ScrollingModule
  ]
})
export class AdmModule { }
