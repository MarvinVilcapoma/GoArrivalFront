import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAuthorizersComponent } from './list-authorizers.component';

describe('ListAuthorizersComponent', () => {
  let component: ListAuthorizersComponent;
  let fixture: ComponentFixture<ListAuthorizersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListAuthorizersComponent]
    });
    fixture = TestBed.createComponent(ListAuthorizersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
