import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovalFlowsComponent } from './approval-flows.component';

describe('ApprovalFlowsComponent', () => {
  let component: ApprovalFlowsComponent;
  let fixture: ComponentFixture<ApprovalFlowsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ApprovalFlowsComponent]
    });
    fixture = TestBed.createComponent(ApprovalFlowsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
