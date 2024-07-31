import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FamilySegmentComponent } from './family-segment.component';

describe('FamilySegmentComponent', () => {
  let component: FamilySegmentComponent;
  let fixture: ComponentFixture<FamilySegmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FamilySegmentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FamilySegmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
