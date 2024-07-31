import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyMenusComponent } from './company-menus.component';

describe('CompanyMenusComponent', () => {
  let component: CompanyMenusComponent;
  let fixture: ComponentFixture<CompanyMenusComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CompanyMenusComponent]
    });
    fixture = TestBed.createComponent(CompanyMenusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
