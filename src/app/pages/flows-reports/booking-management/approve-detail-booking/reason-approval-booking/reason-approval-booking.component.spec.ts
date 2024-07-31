import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReasonApprovalBookingComponent } from './reason-approval-booking.component';

describe('ReasonApprovalBookingComponent', () => {
  let component: ReasonApprovalBookingComponent;
  let fixture: ComponentFixture<ReasonApprovalBookingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReasonApprovalBookingComponent]
    });
    fixture = TestBed.createComponent(ReasonApprovalBookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
