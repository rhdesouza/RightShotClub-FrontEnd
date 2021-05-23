import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form-title-breadcrumbs',
  templateUrl: './form-title-breadcrumbs.component.html',
  styleUrls: ['./form-title-breadcrumbs.component.css']
})
export class FormTitleBreadcrumbsComponent implements OnInit {

  @Input() title: string | null = null;

  constructor(
    private router: Router,
  ) { }

  ngOnInit(): void {

  }

}
