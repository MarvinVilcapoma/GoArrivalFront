import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUpdateListCustomizableComponent } from './create-update-list-customizable.component';

describe('CreateUpdateListCustomizableComponent', () => {
  let component: CreateUpdateListCustomizableComponent;
  let fixture: ComponentFixture<CreateUpdateListCustomizableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateUpdateListCustomizableComponent]
    });
    fixture = TestBed.createComponent(CreateUpdateListCustomizableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
