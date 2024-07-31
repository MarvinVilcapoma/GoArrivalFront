import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUpdateCouponComponent } from './create-update-coupon.component';

describe('CreateUpdateCouponComponent', () => {
  let component: CreateUpdateCouponComponent;
  let fixture: ComponentFixture<CreateUpdateCouponComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateUpdateCouponComponent]
    });
    fixture = TestBed.createComponent(CreateUpdateCouponComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
