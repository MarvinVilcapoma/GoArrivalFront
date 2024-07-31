import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SegmentGroupComponent } from './segment-group.component';

describe('SegmentGroupComponent', () => {
  let component: SegmentGroupComponent;
  let fixture: ComponentFixture<SegmentGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SegmentGroupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SegmentGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
