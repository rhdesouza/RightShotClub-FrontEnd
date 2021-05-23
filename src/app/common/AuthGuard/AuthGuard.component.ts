import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, CanLoad, Route, Router, RouterStateSnapshot } from '@angular/router';
import { LoginService } from '../../login/login.service';
import { StorageComponent } from '../httpService/storage.component';
import { SnakeBarService } from '../snakebar/snakebar.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad {

    constructor(
        private loginService: LoginService,
        private router: Router,
        private storage: StorageComponent,
        private snakeBar: SnakeBarService,
    ) {
    }


    canActivate(activatedRouter: ActivatedRouteSnapshot, routerState: RouterStateSnapshot): boolean {
        if (this.loginService.getUsuatioLogado() && this.hasRole(activatedRouter.routeConfig?.data?.roles)) {
            return true;
        }
        this.router.navigate['/login'];
        return false;
    }

    canActivateChild(activatedRouter: ActivatedRouteSnapshot, routerState: RouterStateSnapshot): boolean {
        if (this.loginService.getUsuatioLogado() && this.hasRole(activatedRouter.routeConfig?.data?.roles)) {
            return true;
        }
        this.router.navigate['/login'];
        return false;
    }

    canLoad(route: Route): boolean {
        let rolePremissa: [] = route?.data?.roles;
        if (!rolePremissa)
            return true;
        return this.hasRole(rolePremissa);
    }

    private hasRole(rolePremissa: []): boolean {
        if (!rolePremissa)
            return true;

        let rolesValidadas: string[] = this.loginService.validaRolesUsuario(rolePremissa);

        if (rolesValidadas.length > 0)
            return true;
        else {
            this.snakeBar.openSnackBarWarn("Usuário sem permissão de acesso.");
            return false
        }
    }

}