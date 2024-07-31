import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgencyCreateUpdateComponent } from './agency-create-update.component';

describe('AgencyCreateUpdateComponent', () => {
  let component: AgencyCreateUpdateComponent;
  let fixture: ComponentFixture<AgencyCreateUpdateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AgencyCreateUpdateComponent]
    });
    fixture = TestBed.createComponent(AgencyCreateUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
