import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PolicyCreateUpdateComponent } from './policy-create-update.component';

describe('PolicyCreateUpdateComponent', () => {
  let component: PolicyCreateUpdateComponent;
  let fixture: ComponentFixture<PolicyCreateUpdateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PolicyCreateUpdateComponent]
    });
    fixture = TestBed.createComponent(PolicyCreateUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
