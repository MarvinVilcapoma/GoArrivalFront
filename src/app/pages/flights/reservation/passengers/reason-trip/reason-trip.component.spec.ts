import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReasonTripComponent } from './reason-trip.component';

describe('ReasonTripComponent', () => {
  let component: ReasonTripComponent;
  let fixture: ComponentFixture<ReasonTripComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReasonTripComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReasonTripComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
