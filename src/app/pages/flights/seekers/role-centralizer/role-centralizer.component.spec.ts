import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoleCentralizerComponent } from './role-centralizer.component';

describe('RoleCentralizerComponent', () => {
  let component: RoleCentralizerComponent;
  let fixture: ComponentFixture<RoleCentralizerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoleCentralizerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoleCentralizerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
