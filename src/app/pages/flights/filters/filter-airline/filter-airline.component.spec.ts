import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterAirlineComponent } from './filter-airline.component';

describe('FilterAirlineComponent', () => {
  let component: FilterAirlineComponent;
  let fixture: ComponentFixture<FilterAirlineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilterAirlineComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilterAirlineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
