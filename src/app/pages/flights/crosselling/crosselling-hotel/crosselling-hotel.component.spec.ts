import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrossellingHotelComponent } from './crosselling-hotel.component';

describe('CrossellingHotelComponent', () => {
  let component: CrossellingHotelComponent;
  let fixture: ComponentFixture<CrossellingHotelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CrossellingHotelComponent]
    });
    fixture = TestBed.createComponent(CrossellingHotelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
