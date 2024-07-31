import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuperUserAgencyComponent } from './super-user-agency.component';

describe('SuperUserAgencyComponent', () => {
  let component: SuperUserAgencyComponent;
  let fixture: ComponentFixture<SuperUserAgencyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SuperUserAgencyComponent]
    });
    fixture = TestBed.createComponent(SuperUserAgencyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
