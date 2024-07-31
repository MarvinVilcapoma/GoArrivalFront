import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalSectionComponent } from './modal-section.component';

describe('ModalSectionComponent', () => {
  let component: ModalSectionComponent;
  let fixture: ComponentFixture<ModalSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalSectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
