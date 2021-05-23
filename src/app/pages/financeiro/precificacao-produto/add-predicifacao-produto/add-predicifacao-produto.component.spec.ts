import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPredicifacaoProdutoComponent } from './add-predicifacao-produto.component';

describe('AddPredicifacaoProdutoComponent', () => {
  let component: AddPredicifacaoProdutoComponent;
  let fixture: ComponentFixture<AddPredicifacaoProdutoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddPredicifacaoProdutoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPredicifacaoProdutoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
