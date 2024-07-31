import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PassengerContactComponent } from './passenger-contact.component';

describe('PassengerContactComponent', () => {
  let component: PassengerContactComponent;
  let fixture: ComponentFixture<PassengerContactComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PassengerContactComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PassengerContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
