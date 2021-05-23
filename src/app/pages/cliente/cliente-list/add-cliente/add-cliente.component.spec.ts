import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AddClienteComponent } from './add-cliente.component';

describe('AddClienteComponent', () => {
  let component: AddClienteComponent;
  let fixture: ComponentFixture<AddClienteComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AddClienteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
