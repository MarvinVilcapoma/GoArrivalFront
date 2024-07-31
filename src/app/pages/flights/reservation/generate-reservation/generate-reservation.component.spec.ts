import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerateReservationComponent } from './generate-reservation.component';

describe('GenerateReservationComponent', () => {
  let component: GenerateReservationComponent;
  let fixture: ComponentFixture<GenerateReservationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenerateReservationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GenerateReservationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
