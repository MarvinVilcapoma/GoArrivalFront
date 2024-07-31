import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignEnterpriseMenuComponent } from './assign-enterprise-menu.component';

describe('AssignEnterpriseMenuComponent', () => {
  let component: AssignEnterpriseMenuComponent;
  let fixture: ComponentFixture<AssignEnterpriseMenuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AssignEnterpriseMenuComponent]
    });
    fixture = TestBed.createComponent(AssignEnterpriseMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
