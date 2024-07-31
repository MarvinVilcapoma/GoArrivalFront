import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChargeManagementComponent } from './charge-management.component';

describe('ChargeManagementComponent', () => {
  let component: ChargeManagementComponent;
  let fixture: ComponentFixture<ChargeManagementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChargeManagementComponent]
    });
    fixture = TestBed.createComponent(ChargeManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
