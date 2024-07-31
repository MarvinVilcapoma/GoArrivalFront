import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CostCreateUpdateComponent } from './cost-create-update.component';

describe('CostCreateUpdateComponent', () => {
  let component: CostCreateUpdateComponent;
  let fixture: ComponentFixture<CostCreateUpdateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CostCreateUpdateComponent]
    });
    fixture = TestBed.createComponent(CostCreateUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
