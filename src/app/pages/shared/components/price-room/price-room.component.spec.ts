import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PriceRoomComponent } from './price-room.component';

describe('PriceRoomComponent', () => {
  let component: PriceRoomComponent;
  let fixture: ComponentFixture<PriceRoomComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PriceRoomComponent]
    });
    fixture = TestBed.createComponent(PriceRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
