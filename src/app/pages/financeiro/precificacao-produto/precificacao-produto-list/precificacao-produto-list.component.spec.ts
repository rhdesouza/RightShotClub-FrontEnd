import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrecificacaoProdutoListComponent } from './precificacao-produto-list.component';

describe('PrecificacaoProdutoListComponent', () => {
  let component: PrecificacaoProdutoListComponent;
  let fixture: ComponentFixture<PrecificacaoProdutoListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrecificacaoProdutoListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrecificacaoProdutoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
