import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailCarComponent } from './detail-car.component';

describe('DetailCarComponent', () => {
  let component: DetailCarComponent;
  let fixture: ComponentFixture<DetailCarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetailCarComponent]
    });
    fixture = TestBed.createComponent(DetailCarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
