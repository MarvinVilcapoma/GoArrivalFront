import { TestBed } from '@angular/core/testing';

import { FlowReportsService } from './flow-reports.service';

describe('FlowReportsService', () => {
  let service: FlowReportsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FlowReportsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
