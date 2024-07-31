import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUdpateMenuComponent } from './create-udpate-menu.component';

describe('CreateUdpateMenuComponent', () => {
  let component: CreateUdpateMenuComponent;
  let fixture: ComponentFixture<CreateUdpateMenuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateUdpateMenuComponent]
    });
    fixture = TestBed.createComponent(CreateUdpateMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
