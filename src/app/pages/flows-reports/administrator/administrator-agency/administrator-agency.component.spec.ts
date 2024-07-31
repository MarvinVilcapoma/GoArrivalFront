import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministratorAgencyComponent } from './administrator-agency.component';

describe('AdministratorAgencyComponent', () => {
  let component: AdministratorAgencyComponent;
  let fixture: ComponentFixture<AdministratorAgencyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdministratorAgencyComponent]
    });
    fixture = TestBed.createComponent(AdministratorAgencyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
