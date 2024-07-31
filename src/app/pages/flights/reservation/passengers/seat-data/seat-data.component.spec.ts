import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeatDataComponent } from './seat-data.component';

describe('SeatDataComponent', () => {
  let component: SeatDataComponent;
  let fixture: ComponentFixture<SeatDataComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SeatDataComponent]
    });
    fixture = TestBed.createComponent(SeatDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
