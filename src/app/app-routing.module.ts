import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './common/AuthGuard/AuthGuard.component';
import { securityRoles } from './common/constantes/security-roles';
import { PageNotFoundComponent } from './common/page-not-found/page-not-found.component';
import { LoginComponent } from './login/login.component';
import { ClienteListComponent } from './pages/cliente/cliente-list/cliente-list.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { FornecedorListComponent } from './pages/fornecedor/fornecedor-list/fornecedor-list.component';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '',
    component: LoginComponent
  },
  /* {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  }, */
  {
    path: 'dashboard',
    loadChildren: () => import('./pages/dashboard/dashboard.module').then(m => m.DashboardModule),
    component: DashboardComponent,
    canActivate: [AuthGuard],
    data: { breadcrumb: 'Dashboard' }
  },
  {
    path: 'adm',
    loadChildren: () => import('./adm/adm.module').then(m => m.AdmModule),
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
    path: 'cliente-list',
    loadChildren: () => import('./pages/cliente/cliente.module').then(m => m.ClienteModule),
    component: ClienteListComponent,
    canActivate: [AuthGuard],
    canLoad: [AuthGuard],
    data: {
      breadcrumb: 'Clientes',
      roles: [
        securityRoles.ROLE_ADMIN_ADMIN,
        securityRoles.ROLE_CLIENTE
      ]
    }
  },
  {
    path: 'fornecedor-list',
    loadChildren: () => import('./pages/fornecedor/fornecedor.module').then(m => m.FornecedorModule),
    component: FornecedorListComponent,
    canActivate: [AuthGuard],
    canLoad: [AuthGuard],
    data: {
      breadcrumb: 'Fornecedor',
      roles: [
        securityRoles.ROLE_ADMIN_ADMIN,
        securityRoles.ROLE_FORNECEDOR
      ]
    }
  },
  {
    path: 'estoque',
    loadChildren: () => import('./pages/estoque/estoque.module').then(m => m.EstoqueModule),
    canActivate: [AuthGuard],
    canLoad: [AuthGuard],
    data: {
      breadcrumb: 'Estoque - Dashboard',
      roles: [
        securityRoles.ROLE_ADMIN_ADMIN,
        securityRoles.ROLE_ESTOQUE,
      ]
    }
  },
  {
    path: 'financeiro',
    loadChildren: () => import('./pages/financeiro/financeiro.module').then(m => m.FinanceiroModule),
    canActivate: [AuthGuard],
    canLoad: [AuthGuard],
    data: {
      breadcrumb: 'Financeiro - Dashboard',
      roles: [
        securityRoles.ROLE_ADMIN_ADMIN,
        securityRoles.ROLE_NOTAFISCAL,
        securityRoles.ROLE_PRECIFICACAO,

      ]
    }
  },
  /*     {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      }, */
  /* {
    path: 'employees', 
    loadChildren: () => import('./employees/employees.module').then(m => m.EmployeesModule),
    canActivate: [AuthGuard],
    canLoad: [AuthGuard],
    data: { roles: [
      RoleName.ROLE_LIST_ALL_EMPLOYEES, 
      RoleName.ROLE_REGISTER_NEW_EMPLOYEE, 
      RoleName.ROLE_VIEW_EMPLOYEE_DETAILS, 
      RoleName.ROLE_UPDATE_EMPLOYEE_DATA, 
      RoleName.ROLE_DELETE_EMPLOYEE
    ] }
  },
  {
    path: 'staffs', 
    loadChildren: () => import('./staffs/staffs.module').then(m => m.StaffsModule),
    canActivate: [AuthGuard],
    canLoad: [AuthGuard],
    data: { roles: [
      RoleName.ROLE_LIST_ALL_STAFFS, 
      RoleName.ROLE_REGISTER_NEW_STAFF, 
      RoleName.ROLE_VIEW_STAFF_DETAILS, 
      RoleName.ROLE_UPDATE_STAFF_DATA, 
      RoleName.ROLE_DELETE_STAFF
    ] }
  },
  {
    path: 'vacations', 
    loadChildren: () => import('./vacations/vacations.module').then(m => m.VacationsModule),
    canActivate: [AuthGuard],
    canLoad: [AuthGuard],
    data: { roles: [
      RoleName.ROLE_LIST_ALL_VACATIONS, 
      RoleName.ROLE_REGISTER_NEW_VACATION, 
      RoleName.ROLE_VIEW_VACATION_DETAILS, 
      RoleName.ROLE_UPDATE_VACATION_DATA, 
      RoleName.ROLE_DELETE_VACATION
    ] }
  },
  {
    path: 'invalid-access', 
    component: InvalidAccessComponent
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },*/
  {
    path: '**',
    component: PageNotFoundComponent
  }
];
@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true, relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }