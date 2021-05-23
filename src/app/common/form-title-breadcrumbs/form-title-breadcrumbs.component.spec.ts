import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormTitleBreadcrumbsComponent } from './form-title-breadcrumbs.component';

describe('FormTitleBreadcrumbsComponent', () => {
  let component: FormTitleBreadcrumbsComponent;
  let fixture: ComponentFixture<FormTitleBreadcrumbsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormTitleBreadcrumbsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormTitleBreadcrumbsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
