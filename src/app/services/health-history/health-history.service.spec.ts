import { TestBed } from '@angular/core/testing';

import { HealthHistoryService } from './health-history.service';

describe('HealthHistoryService', () => {
  let service: HealthHistoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HealthHistoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
