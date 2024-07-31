import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterHourComponent } from './filter-hour.component';

describe('FilterHourComponent', () => {
  let component: FilterHourComponent;
  let fixture: ComponentFixture<FilterHourComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilterHourComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilterHourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
