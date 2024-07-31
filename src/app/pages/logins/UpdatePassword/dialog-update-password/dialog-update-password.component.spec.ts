import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogUpdatePasswordComponent } from './dialog-update-password.component';

describe('DialogUpdatePasswordComponent', () => {
  let component: DialogUpdatePasswordComponent;
  let fixture: ComponentFixture<DialogUpdatePasswordComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogUpdatePasswordComponent]
    });
    fixture = TestBed.createComponent(DialogUpdatePasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
