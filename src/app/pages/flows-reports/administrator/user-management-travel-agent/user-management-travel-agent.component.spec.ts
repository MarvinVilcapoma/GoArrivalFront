import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserManagementTravelAgentComponent } from './user-management-travel-agent.component';

describe('UserManagementTravelAgentComponent', () => {
  let component: UserManagementTravelAgentComponent;
  let fixture: ComponentFixture<UserManagementTravelAgentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserManagementTravelAgentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserManagementTravelAgentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
