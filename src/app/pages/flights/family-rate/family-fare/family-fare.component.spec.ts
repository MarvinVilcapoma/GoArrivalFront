import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FamilyFareComponent } from './family-fare.component';

describe('FamilyFareComponent', () => {
  let component: FamilyFareComponent;
  let fixture: ComponentFixture<FamilyFareComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FamilyFareComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FamilyFareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
