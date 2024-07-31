import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUpdateGroupComponent } from './create-update-group.component';

describe('CreateUpdateGroupComponent', () => {
  let component: CreateUpdateGroupComponent;
  let fixture: ComponentFixture<CreateUpdateGroupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateUpdateGroupComponent]
    });
    fixture = TestBed.createComponent(CreateUpdateGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
