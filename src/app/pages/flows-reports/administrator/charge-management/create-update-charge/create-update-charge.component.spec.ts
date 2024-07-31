import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUpdateChargeComponent } from './create-update-charge.component';

describe('CreateUpdateChargeComponent', () => {
  let component: CreateUpdateChargeComponent;
  let fixture: ComponentFixture<CreateUpdateChargeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateUpdateChargeComponent]
    });
    fixture = TestBed.createComponent(CreateUpdateChargeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
