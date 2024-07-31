import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PseudosComponent } from './pseudos.component';

describe('PseudosComponent', () => {
  let component: PseudosComponent;
  let fixture: ComponentFixture<PseudosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PseudosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PseudosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
