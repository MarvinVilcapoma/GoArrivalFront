import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservationCarComponent } from './reservation-car.component';

describe('ReservationCarComponent', () => {
  let component: ReservationCarComponent;
  let fixture: ComponentFixture<ReservationCarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReservationCarComponent]
    });
    fixture = TestBed.createComponent(ReservationCarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
