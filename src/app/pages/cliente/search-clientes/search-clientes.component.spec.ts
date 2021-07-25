import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchClientesComponent } from './search-clientes.component';

describe('SearchClientesComponent', () => {
  let component: SearchClientesComponent;
  let fixture: ComponentFixture<SearchClientesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchClientesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchClientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
