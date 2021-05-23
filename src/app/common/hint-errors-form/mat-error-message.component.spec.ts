import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HintErrorsFormComponent } from './mat-error-message.component';

describe('HintErrorsFormComponent', () => {
  let component: HintErrorsFormComponent;
  let fixture: ComponentFixture<HintErrorsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HintErrorsFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HintErrorsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
