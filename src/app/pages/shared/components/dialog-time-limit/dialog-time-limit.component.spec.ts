import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogTimeLimitComponent } from './dialog-time-limit.component';

describe('DialogTimeLimitComponent', () => {
  let component: DialogTimeLimitComponent;
  let fixture: ComponentFixture<DialogTimeLimitComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogTimeLimitComponent]
    });
    fixture = TestBed.createComponent(DialogTimeLimitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
