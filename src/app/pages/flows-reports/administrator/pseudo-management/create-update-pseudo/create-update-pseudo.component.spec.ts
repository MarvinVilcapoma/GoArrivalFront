import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUpdatePseudoComponent } from './create-update-pseudo.component';

describe('CreateUpdatePseudoComponent', () => {
  let component: CreateUpdatePseudoComponent;
  let fixture: ComponentFixture<CreateUpdatePseudoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateUpdatePseudoComponent]
    });
    fixture = TestBed.createComponent(CreateUpdatePseudoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
