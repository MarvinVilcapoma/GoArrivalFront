import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FamilyRateComponent } from './family-rate.component';

describe('FamilyRateComponent', () => {
  let component: FamilyRateComponent;
  let fixture: ComponentFixture<FamilyRateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FamilyRateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FamilyRateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
