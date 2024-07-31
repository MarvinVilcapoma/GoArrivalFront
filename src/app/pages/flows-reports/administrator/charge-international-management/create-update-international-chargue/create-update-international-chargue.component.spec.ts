import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUpdateInternationalChargueComponent } from './create-update-international-chargue.component';

describe('CreateUpdateInternationalChargueComponent', () => {
  let component: CreateUpdateInternationalChargueComponent;
  let fixture: ComponentFixture<CreateUpdateInternationalChargueComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateUpdateInternationalChargueComponent]
    });
    fixture = TestBed.createComponent(CreateUpdateInternationalChargueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
