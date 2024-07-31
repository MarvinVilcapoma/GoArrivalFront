import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BagsComponent } from './bags.component';

describe('BagsComponent', () => {
  let component: BagsComponent;
  let fixture: ComponentFixture<BagsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BagsComponent]
    });
    fixture = TestBed.createComponent(BagsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
