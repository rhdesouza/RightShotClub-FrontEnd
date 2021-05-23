import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNotaFiscalComponent } from './add-nota-fiscal.component';

describe('AddNotaFiscalComponent', () => {
  let component: AddNotaFiscalComponent;
  let fixture: ComponentFixture<AddNotaFiscalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddNotaFiscalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNotaFiscalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
