import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddVendaProdutoComponent } from './add-venda-produto.component';

describe('AddVendaProdutoComponent', () => {
  let component: AddVendaProdutoComponent;
  let fixture: ComponentFixture<AddVendaProdutoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddVendaProdutoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddVendaProdutoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
