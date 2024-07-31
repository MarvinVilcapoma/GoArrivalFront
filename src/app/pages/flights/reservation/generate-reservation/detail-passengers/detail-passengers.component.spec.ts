import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailPassengersComponent } from './detail-passengers.component';

describe('DetailPassengersComponent', () => {
  let component: DetailPassengersComponent;
  let fixture: ComponentFixture<DetailPassengersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailPassengersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailPassengersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
