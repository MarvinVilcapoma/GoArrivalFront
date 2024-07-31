import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterStarComponent } from './filter-star.component';

describe('FilterStarComponent', () => {
  let component: FilterStarComponent;
  let fixture: ComponentFixture<FilterStarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FilterStarComponent]
    });
    fixture = TestBed.createComponent(FilterStarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
