import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReissueSuccessComponent } from './reissue-success.component';

describe('ReissueSuccessComponent', () => {
  let component: ReissueSuccessComponent;
  let fixture: ComponentFixture<ReissueSuccessComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReissueSuccessComponent]
    });
    fixture = TestBed.createComponent(ReissueSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
