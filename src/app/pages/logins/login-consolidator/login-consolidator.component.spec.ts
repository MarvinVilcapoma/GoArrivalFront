import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginConsolidatorComponent } from './login-consolidator.component';

describe('LoginConsolidatorComponent', () => {
  let component: LoginConsolidatorComponent;
  let fixture: ComponentFixture<LoginConsolidatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginConsolidatorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginConsolidatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
