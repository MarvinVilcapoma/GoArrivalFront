import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailSegmentComponent } from './detail-segment.component';

describe('DetailSegmentComponent', () => {
  let component: DetailSegmentComponent;
  let fixture: ComponentFixture<DetailSegmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailSegmentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailSegmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
