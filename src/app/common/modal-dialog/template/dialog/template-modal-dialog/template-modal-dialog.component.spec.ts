import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateModalDialogComponent } from './template-modal-dialog.component';

describe('TemplateModalDialogComponent', () => {
  let component: TemplateModalDialogComponent;
  let fixture: ComponentFixture<TemplateModalDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TemplateModalDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TemplateModalDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
