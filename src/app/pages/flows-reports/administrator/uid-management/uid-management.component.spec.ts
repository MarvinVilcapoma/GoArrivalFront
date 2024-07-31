import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UidManagementComponent } from './uid-management.component';

describe('UidManagementComponent', () => {
  let component: UidManagementComponent;
  let fixture: ComponentFixture<UidManagementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UidManagementComponent]
    });
    fixture = TestBed.createComponent(UidManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
