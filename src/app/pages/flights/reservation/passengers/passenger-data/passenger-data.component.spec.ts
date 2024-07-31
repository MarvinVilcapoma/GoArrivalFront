import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PassengerDataComponent } from './passenger-data.component';

describe('PassengerDataComponent', () => {
  let component: PassengerDataComponent;
  let fixture: ComponentFixture<PassengerDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PassengerDataComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PassengerDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
