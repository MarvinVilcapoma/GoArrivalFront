import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrossellingDataComponent } from './crosselling-data.component';

describe('CrossellingDataComponent', () => {
  let component: CrossellingDataComponent;
  let fixture: ComponentFixture<CrossellingDataComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CrossellingDataComponent]
    });
    fixture = TestBed.createComponent(CrossellingDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
