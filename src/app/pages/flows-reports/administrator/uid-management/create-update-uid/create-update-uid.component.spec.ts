import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUpdateUidComponent } from './create-update-uid.component';

describe('CreateUpdateUidComponent', () => {
  let component: CreateUpdateUidComponent;
  let fixture: ComponentFixture<CreateUpdateUidComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateUpdateUidComponent]
    });
    fixture = TestBed.createComponent(CreateUpdateUidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
