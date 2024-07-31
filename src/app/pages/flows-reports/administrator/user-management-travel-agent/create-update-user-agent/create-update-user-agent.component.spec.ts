import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUpdateUserAgentComponent } from './create-update-user-agent.component';

describe('CreateUpdateUserAgentComponent', () => {
  let component: CreateUpdateUserAgentComponent;
  let fixture: ComponentFixture<CreateUpdateUserAgentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateUpdateUserAgentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateUpdateUserAgentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
