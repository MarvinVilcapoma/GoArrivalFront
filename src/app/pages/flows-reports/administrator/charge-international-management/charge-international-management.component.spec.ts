import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChargeInternationalManagementComponent } from './charge-international-management.component';

describe('ChargeInternationalManagementComponent', () => {
  let component: ChargeInternationalManagementComponent;
  let fixture: ComponentFixture<ChargeInternationalManagementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChargeInternationalManagementComponent]
    });
    fixture = TestBed.createComponent(ChargeInternationalManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
