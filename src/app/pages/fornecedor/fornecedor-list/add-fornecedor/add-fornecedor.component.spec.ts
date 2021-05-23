import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AddFornecedorComponent } from './add-fornecedor.component';

describe('AddClienteComponent', () => {
  let component: AddFornecedorComponent;
  let fixture: ComponentFixture<AddFornecedorComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AddFornecedorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddFornecedorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
