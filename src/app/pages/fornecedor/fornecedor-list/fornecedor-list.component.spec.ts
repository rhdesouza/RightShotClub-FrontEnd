import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { FornecedorListComponent } from './fornecedor-list.component';

describe('FornecedorListComponent', () => {
  let component: FornecedorListComponent;
  let fixture: ComponentFixture<FornecedorListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ FornecedorListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FornecedorListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
