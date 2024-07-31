import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagementAgencySuperComponent } from './management-agency-super.component';

describe('ManagementAgencySuperComponent', () => {
  let component: ManagementAgencySuperComponent;
  let fixture: ComponentFixture<ManagementAgencySuperComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManagementAgencySuperComponent]
    });
    fixture = TestBed.createComponent(ManagementAgencySuperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
