import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BagDataComponent } from './bag-data.component';

describe('BagDataComponent', () => {
  let component: BagDataComponent;
  let fixture: ComponentFixture<BagDataComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BagDataComponent]
    });
    fixture = TestBed.createComponent(BagDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
