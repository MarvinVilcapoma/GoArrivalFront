import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewManagementComponent } from './view-management.component';

describe('ViewManagementComponent', () => {
  let component: ViewManagementComponent;
  let fixture: ComponentFixture<ViewManagementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewManagementComponent]
    });
    fixture = TestBed.createComponent(ViewManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
