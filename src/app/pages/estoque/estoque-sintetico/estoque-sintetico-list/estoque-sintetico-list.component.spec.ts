import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstoqueSinteticoListComponent } from './estoque-sintetico-list.component';

describe('EstoqueSinteticoListComponent', () => {
  let component: EstoqueSinteticoListComponent;
  let fixture: ComponentFixture<EstoqueSinteticoListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EstoqueSinteticoListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EstoqueSinteticoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
