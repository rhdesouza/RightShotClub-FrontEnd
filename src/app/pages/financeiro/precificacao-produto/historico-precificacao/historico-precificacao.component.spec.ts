import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoricoPrecificacaoComponent } from './historico-precificacao.component';

describe('HistoricoPrecificacaoComponent', () => {
  let component: HistoricoPrecificacaoComponent;
  let fixture: ComponentFixture<HistoricoPrecificacaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistoricoPrecificacaoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoricoPrecificacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
