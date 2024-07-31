import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileGdsManagementComponent } from './profile-gds-management.component';

describe('ProfileGdsManagementComponent', () => {
  let component: ProfileGdsManagementComponent;
  let fixture: ComponentFixture<ProfileGdsManagementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProfileGdsManagementComponent]
    });
    fixture = TestBed.createComponent(ProfileGdsManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
