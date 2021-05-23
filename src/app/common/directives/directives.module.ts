import { NgModule } from "@angular/core";
import { RolesDirective } from "./roles.directive";
import { RolesDisableDirective } from "./rolesDisabe.directive"


@NgModule({
    declarations: [RolesDirective, RolesDisableDirective],
    imports: [],
    exports: [RolesDirective, RolesDisableDirective]
})
export class DirectivesModule { }