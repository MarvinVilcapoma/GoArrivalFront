import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalDetailFlightComponent } from './modal-detail-flight.component';

describe('ModalDetailFlightComponent', () => {
  let component: ModalDetailFlightComponent;
  let fixture: ComponentFixture<ModalDetailFlightComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalDetailFlightComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalDetailFlightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
