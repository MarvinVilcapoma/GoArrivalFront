import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CodeManagementComponent } from './code-management.component';

describe('CodeManagementComponent', () => {
  let component: CodeManagementComponent;
  let fixture: ComponentFixture<CodeManagementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CodeManagementComponent]
    });
    fixture = TestBed.createComponent(CodeManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
