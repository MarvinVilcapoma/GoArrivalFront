import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsuranceSearchComponent } from './insurance-search.component';

describe('InsuranceSearchComponent', () => {
  let component: InsuranceSearchComponent;
  let fixture: ComponentFixture<InsuranceSearchComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InsuranceSearchComponent]
    });
    fixture = TestBed.createComponent(InsuranceSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
