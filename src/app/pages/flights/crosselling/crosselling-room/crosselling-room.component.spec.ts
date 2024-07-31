import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrossellingRoomComponent } from './crosselling-room.component';

describe('CrossellingRoomComponent', () => {
  let component: CrossellingRoomComponent;
  let fixture: ComponentFixture<CrossellingRoomComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CrossellingRoomComponent]
    });
    fixture = TestBed.createComponent(CrossellingRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
