import { Component, Input } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'ngbd-modal-content',
  templateUrl: './modal.component.html'
})
export class ModalComponent {
  @Input() tituloModal: string = "Modal sem título";
  @Input() modalFooter: string = "true";

  constructor(public activeModal: NgbActiveModal) {
  }

  ngOnInit() {
  }

  public exibeModalFooter(): boolean {
    return this.modalFooter == "true" ? true : false;
  }
}
