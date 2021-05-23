
import { Directive, ElementRef, HostBinding, Input, OnInit, Renderer2, TemplateRef, ViewContainerRef } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { LoginService } from 'src/app/login/login.service';

/**
 * Exemplo:
 * 
 *     <button mat-raised-button color="primary" (click)="adicionarFornecedor()"
        ifDisableRoles [roles]="['ROLE_ADMIN_ADMIN']">Incluir Fornecedor</button>
 */



@Directive({
    selector: '[ifDisableRoles]'
})

export class RolesDisableDirective {
    @Input() public roles!: Array<string>;

    public rolesSubject!: BehaviorSubject<any>;
    public rolesObs!: Observable<any>;

    constructor(
        private loginService: LoginService,
    ) {
    }

    @HostBinding('disabled')
    @HostBinding('class.mat-button-disabled')
    private disabled: boolean = true;

    public ngOnInit() {

        let rolesValidadas = this.loginService.validaRolesUsuario(this.roles);
        this.rolesSubject = new BehaviorSubject<boolean>(!!(rolesValidadas.length > 0));
        this.rolesObs = this.rolesSubject.asObservable();

        this.rolesObs.subscribe((x: boolean) => {
            if (x) {
                this.disabled = false;
            }
            else {
                this.disabled = true;
            }
        })

    }

}