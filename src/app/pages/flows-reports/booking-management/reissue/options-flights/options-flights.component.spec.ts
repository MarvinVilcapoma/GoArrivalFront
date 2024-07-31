import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OptionsFlightsComponent } from './options-flights.component';

describe('OptionsFlightsComponent', () => {
  let component: OptionsFlightsComponent;
  let fixture: ComponentFixture<OptionsFlightsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OptionsFlightsComponent]
    });
    fixture = TestBed.createComponent(OptionsFlightsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
