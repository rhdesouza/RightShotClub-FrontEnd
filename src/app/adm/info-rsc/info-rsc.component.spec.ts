import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoRscComponent } from './info-rsc.component';

describe('InfoRscComponent', () => {
  let component: InfoRscComponent;
  let fixture: ComponentFixture<InfoRscComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfoRscComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoRscComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
