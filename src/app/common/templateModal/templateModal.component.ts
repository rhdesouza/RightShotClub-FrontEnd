import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-template-modal',
  templateUrl: './templateModal.component.html',
  styleUrls: ['./templateModal.component.scss']
})

export class TemplateModal implements OnInit {

  @Input() titleModal!:string;

  constructor() { }

  ngOnInit(): void {
  }

}
