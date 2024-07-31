import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiDestinationComponent } from './multi-destination.component';

describe('MultiDestinationComponent', () => {
  let component: MultiDestinationComponent;
  let fixture: ComponentFixture<MultiDestinationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MultiDestinationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MultiDestinationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
