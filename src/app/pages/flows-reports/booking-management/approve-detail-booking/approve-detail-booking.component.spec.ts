import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveDetailBookingComponent } from './approve-detail-booking.component';

describe('ApproveDetailBookingComponent', () => {
  let component: ApproveDetailBookingComponent;
  let fixture: ComponentFixture<ApproveDetailBookingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ApproveDetailBookingComponent]
    });
    fixture = TestBed.createComponent(ApproveDetailBookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
