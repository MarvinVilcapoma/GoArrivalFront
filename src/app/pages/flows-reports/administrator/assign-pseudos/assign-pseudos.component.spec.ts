import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignPseudosComponent } from './assign-pseudos.component';

describe('AssignPseudosComponent', () => {
  let component: AssignPseudosComponent;
  let fixture: ComponentFixture<AssignPseudosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AssignPseudosComponent]
    });
    fixture = TestBed.createComponent(AssignPseudosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
