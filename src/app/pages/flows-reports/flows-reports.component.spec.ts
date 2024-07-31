import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlowsReportsComponent } from './flows-reports.component';

describe('FlowsReportsComponent', () => {
  let component: FlowsReportsComponent;
  let fixture: ComponentFixture<FlowsReportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FlowsReportsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FlowsReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
