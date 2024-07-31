import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproversPoliciesComponent } from './approvers-policies.component';

describe('ApproversPoliciesComponent', () => {
  let component: ApproversPoliciesComponent;
  let fixture: ComponentFixture<ApproversPoliciesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApproversPoliciesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApproversPoliciesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
