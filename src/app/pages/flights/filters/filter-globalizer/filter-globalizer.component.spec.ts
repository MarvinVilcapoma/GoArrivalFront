import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterGlobalizerComponent } from './filter-globalizer.component';

describe('FilterGlobalizerComponent', () => {
  let component: FilterGlobalizerComponent;
  let fixture: ComponentFixture<FilterGlobalizerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FilterGlobalizerComponent]
    });
    fixture = TestBed.createComponent(FilterGlobalizerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
