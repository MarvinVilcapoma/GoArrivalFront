import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCustomizableManagementComponent } from './list-customizable-management.component';

describe('ListCustomizableManagementComponent', () => {
  let component: ListCustomizableManagementComponent;
  let fixture: ComponentFixture<ListCustomizableManagementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListCustomizableManagementComponent]
    });
    fixture = TestBed.createComponent(ListCustomizableManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
