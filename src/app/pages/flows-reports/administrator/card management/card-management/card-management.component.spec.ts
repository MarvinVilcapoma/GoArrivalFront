import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardManagementComponent } from './card-management.component';

describe('CardManagementComponent', () => {
  let component: CardManagementComponent;
  let fixture: ComponentFixture<CardManagementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CardManagementComponent]
    });
    fixture = TestBed.createComponent(CardManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
