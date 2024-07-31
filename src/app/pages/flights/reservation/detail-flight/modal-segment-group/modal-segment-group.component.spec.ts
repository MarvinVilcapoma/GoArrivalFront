import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalSegmentGroupComponent } from './modal-segment-group.component';

describe('ModalSegmentGroupComponent', () => {
  let component: ModalSegmentGroupComponent;
  let fixture: ComponentFixture<ModalSegmentGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalSegmentGroupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalSegmentGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
