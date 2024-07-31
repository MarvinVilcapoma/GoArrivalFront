import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalSegmentComponent } from './modal-segment.component';

describe('ModalSegmentComponent', () => {
  let component: ModalSegmentComponent;
  let fixture: ComponentFixture<ModalSegmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalSegmentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalSegmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
