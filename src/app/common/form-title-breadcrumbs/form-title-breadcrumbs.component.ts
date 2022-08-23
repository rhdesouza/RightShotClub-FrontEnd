import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-form-title-breadcrumbs',
  templateUrl: './form-title-breadcrumbs.component.html',
  styleUrls: ['./form-title-breadcrumbs.component.css']
})
export class FormTitleBreadcrumbsComponent implements OnInit {

  @Input() title: string | null = null;

  constructor(
  ) { }

  ngOnInit(): void {
  }

}
