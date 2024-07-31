import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailAccessComponent } from './detail-access.component';

describe('DetailAccessComponent', () => {
  let component: DetailAccessComponent;
  let fixture: ComponentFixture<DetailAccessComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetailAccessComponent]
    });
    fixture = TestBed.createComponent(DetailAccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
