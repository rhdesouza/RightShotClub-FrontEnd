import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { GaleriaFotosComponent } from './galeria-fotos.component';

describe('GaleriaFotosComponent', () => {
  let component: GaleriaFotosComponent;
  let fixture: ComponentFixture<GaleriaFotosComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ GaleriaFotosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GaleriaFotosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
