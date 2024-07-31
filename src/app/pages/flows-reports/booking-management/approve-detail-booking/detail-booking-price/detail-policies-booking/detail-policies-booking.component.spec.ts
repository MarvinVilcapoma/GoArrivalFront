import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailPoliciesBookingComponent } from './detail-policies-booking.component';

describe('DetailPoliciesBookingComponent', () => {
  let component: DetailPoliciesBookingComponent;
  let fixture: ComponentFixture<DetailPoliciesBookingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetailPoliciesBookingComponent]
    });
    fixture = TestBed.createComponent(DetailPoliciesBookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
