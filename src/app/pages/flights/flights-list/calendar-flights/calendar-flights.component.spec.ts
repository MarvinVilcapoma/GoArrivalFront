import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarFlightsComponent } from './calendar-flights.component';

describe('CalendarFlightsComponent', () => {
  let component: CalendarFlightsComponent;
  let fixture: ComponentFixture<CalendarFlightsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalendarFlightsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalendarFlightsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
