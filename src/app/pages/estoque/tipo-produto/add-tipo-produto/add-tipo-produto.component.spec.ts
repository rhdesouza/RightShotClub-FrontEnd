import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTipoProdutoComponent } from './add-tipo-produto.component';

describe('AddTipoProdutoComponent', () => {
  let component: AddTipoProdutoComponent;
  let fixture: ComponentFixture<AddTipoProdutoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddTipoProdutoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTipoProdutoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
