import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsuranceSuccessfulComponent } from './insurance-successful.component';

describe('InsuranceSuccessfulComponent', () => {
  let component: InsuranceSuccessfulComponent;
  let fixture: ComponentFixture<InsuranceSuccessfulComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InsuranceSuccessfulComponent]
    });
    fixture = TestBed.createComponent(InsuranceSuccessfulComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
