import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailPriceComponent } from './detail-price.component';

describe('DetailPriceComponent', () => {
  let component: DetailPriceComponent;
  let fixture: ComponentFixture<DetailPriceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailPriceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailPriceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
