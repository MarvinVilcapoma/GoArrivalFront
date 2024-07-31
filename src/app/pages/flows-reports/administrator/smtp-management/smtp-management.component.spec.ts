import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmtpManagementComponent } from './smtp-management.component';

describe('SmtpManagementComponent', () => {
  let component: SmtpManagementComponent;
  let fixture: ComponentFixture<SmtpManagementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SmtpManagementComponent]
    });
    fixture = TestBed.createComponent(SmtpManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
