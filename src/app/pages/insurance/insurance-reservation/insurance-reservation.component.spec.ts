import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsuranceReservationComponent } from './insurance-reservation.component';

describe('InsuranceReservationComponent', () => {
  let component: InsuranceReservationComponent;
  let fixture: ComponentFixture<InsuranceReservationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InsuranceReservationComponent]
    });
    fixture = TestBed.createComponent(InsuranceReservationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
