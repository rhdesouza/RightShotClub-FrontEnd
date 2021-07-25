import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchProdutoPrecificadoComponent } from './search-produto-precificado.component';

describe('SearchProdutoPrecificadoComponent', () => {
  let component: SearchProdutoPrecificadoComponent;
  let fixture: ComponentFixture<SearchProdutoPrecificadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchProdutoPrecificadoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchProdutoPrecificadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
