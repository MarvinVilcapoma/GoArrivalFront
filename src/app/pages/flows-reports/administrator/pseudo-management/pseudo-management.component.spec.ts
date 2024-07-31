import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PseudoManagementComponent } from './pseudo-management.component';

describe('PseudoManagementComponent', () => {
  let component: PseudoManagementComponent;
  let fixture: ComponentFixture<PseudoManagementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PseudoManagementComponent]
    });
    fixture = TestBed.createComponent(PseudoManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
