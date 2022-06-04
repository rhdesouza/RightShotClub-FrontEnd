import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from './modal.component';

@NgModule({
    imports: [
        CommonModule,
        NgbModule
    ],
    declarations: [ModalComponent],
    exports: [ModalComponent],
    bootstrap: [ModalComponent]
})
export class ModalModule {}
