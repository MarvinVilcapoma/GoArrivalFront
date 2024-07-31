import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PruebaChildrenComponent } from './prueba-children.component';

describe('PruebaChildrenComponent', () => {
  let component: PruebaChildrenComponent;
  let fixture: ComponentFixture<PruebaChildrenComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PruebaChildrenComponent]
    });
    fixture = TestBed.createComponent(PruebaChildrenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
