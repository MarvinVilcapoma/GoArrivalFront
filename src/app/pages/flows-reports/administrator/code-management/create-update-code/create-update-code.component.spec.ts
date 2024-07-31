import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUpdateCodeComponent } from './create-update-code.component';

describe('CreateUpdateCodeComponent', () => {
  let component: CreateUpdateCodeComponent;
  let fixture: ComponentFixture<CreateUpdateCodeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateUpdateCodeComponent]
    });
    fixture = TestBed.createComponent(CreateUpdateCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
