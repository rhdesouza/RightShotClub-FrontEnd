import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendaProdutoListComponent } from './venda-produto-list.component';

describe('VendaProdutoListComponent', () => {
  let component: VendaProdutoListComponent;
  let fixture: ComponentFixture<VendaProdutoListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VendaProdutoListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VendaProdutoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
