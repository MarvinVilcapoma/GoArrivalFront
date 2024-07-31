import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CostCenterComponent } from './cost-center.component';

describe('CostCenterComponent', () => {
  let component: CostCenterComponent;
  let fixture: ComponentFixture<CostCenterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CostCenterComponent]
    });
    fixture = TestBed.createComponent(CostCenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
