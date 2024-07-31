import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailBookingPriceComponent } from './detail-booking-price.component';

describe('DetailBookingPriceComponent', () => {
  let component: DetailBookingPriceComponent;
  let fixture: ComponentFixture<DetailBookingPriceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetailBookingPriceComponent]
    });
    fixture = TestBed.createComponent(DetailBookingPriceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
