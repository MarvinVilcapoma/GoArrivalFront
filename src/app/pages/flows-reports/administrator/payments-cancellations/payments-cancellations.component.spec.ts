import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentsCancellationsComponent } from './payments-cancellations.component';

describe('PaymentsCancellationsComponent', () => {
  let component: PaymentsCancellationsComponent;
  let fixture: ComponentFixture<PaymentsCancellationsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PaymentsCancellationsComponent]
    });
    fixture = TestBed.createComponent(PaymentsCancellationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
