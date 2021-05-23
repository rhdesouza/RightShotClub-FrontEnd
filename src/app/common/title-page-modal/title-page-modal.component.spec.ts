import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TitlePageModalComponent } from './title-page-modal.component';

describe('TitlePageModalComponent', () => {
  let component: TitlePageModalComponent;
  let fixture: ComponentFixture<TitlePageModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TitlePageModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TitlePageModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
