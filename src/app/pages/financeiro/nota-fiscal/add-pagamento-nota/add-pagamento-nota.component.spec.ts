import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPagamentoNotaComponent } from './add-pagamento-nota.component';

describe('AddPagamentoNotaComponent', () => {
  let component: AddPagamentoNotaComponent;
  let fixture: ComponentFixture<AddPagamentoNotaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddPagamentoNotaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPagamentoNotaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
