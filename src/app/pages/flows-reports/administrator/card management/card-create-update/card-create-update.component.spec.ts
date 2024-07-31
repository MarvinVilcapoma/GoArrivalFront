import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardCreateUpdateComponent } from './card-create-update.component';

describe('CardCreateUpdateComponent', () => {
  let component: CardCreateUpdateComponent;
  let fixture: ComponentFixture<CardCreateUpdateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CardCreateUpdateComponent]
    });
    fixture = TestBed.createComponent(CardCreateUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
