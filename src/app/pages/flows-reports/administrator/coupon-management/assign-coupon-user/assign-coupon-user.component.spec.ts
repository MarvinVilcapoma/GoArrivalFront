import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignCouponUserComponent } from './assign-coupon-user.component';

describe('AssignCouponUserComponent', () => {
  let component: AssignCouponUserComponent;
  let fixture: ComponentFixture<AssignCouponUserComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AssignCouponUserComponent]
    });
    fixture = TestBed.createComponent(AssignCouponUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
