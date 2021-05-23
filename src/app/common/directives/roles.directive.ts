
import { Directive, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { LoginService } from 'src/app/login/login.service';

@Directive({
    selector: '[ifRoles]'
})

export class RolesDirective implements OnInit {
    @Input() public ifRoles!: Array<string>;

    public rolesSubject!: BehaviorSubject<any>;
    public rolesObs!: Observable<any>;

    constructor(
        private templateRef: TemplateRef<any>,
        private viewContainerRef: ViewContainerRef,
        private loginService: LoginService
    ) {
    }

    public ngOnInit() {
        let rolesValidadas = this.loginService.validaRolesUsuario(this.ifRoles);

        this.rolesSubject = new BehaviorSubject<any>(!!(rolesValidadas.length > 0));
        this.rolesObs = this.rolesSubject.asObservable();

        this.rolesObs.subscribe(x => {
            if (x)
                this.viewContainerRef.createEmbeddedView(this.templateRef);
            else
                this.viewContainerRef.clear();
        })
    }
}