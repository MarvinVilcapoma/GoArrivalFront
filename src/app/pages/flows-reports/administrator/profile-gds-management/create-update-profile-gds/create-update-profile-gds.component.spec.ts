import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUpdateProfileGdsComponent } from './create-update-profile-gds.component';

describe('CreateUpdateProfileGdsComponent', () => {
  let component: CreateUpdateProfileGdsComponent;
  let fixture: ComponentFixture<CreateUpdateProfileGdsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateUpdateProfileGdsComponent]
    });
    fixture = TestBed.createComponent(CreateUpdateProfileGdsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
