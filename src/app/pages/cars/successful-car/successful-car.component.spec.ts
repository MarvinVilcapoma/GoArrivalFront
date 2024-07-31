import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuccessfulCarComponent } from './successful-car.component';

describe('SuccessfulCarComponent', () => {
  let component: SuccessfulCarComponent;
  let fixture: ComponentFixture<SuccessfulCarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SuccessfulCarComponent]
    });
    fixture = TestBed.createComponent(SuccessfulCarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
