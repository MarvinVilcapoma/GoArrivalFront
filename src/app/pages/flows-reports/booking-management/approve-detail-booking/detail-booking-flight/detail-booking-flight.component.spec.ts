import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailBookingFlightComponent } from './detail-booking-flight.component';

describe('DetailBookingFlightComponent', () => {
  let component: DetailBookingFlightComponent;
  let fixture: ComponentFixture<DetailBookingFlightComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetailBookingFlightComponent]
    });
    fixture = TestBed.createComponent(DetailBookingFlightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
