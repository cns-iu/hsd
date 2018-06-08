import { TestBed, inject } from '@angular/core/testing';

import { SumTreeMockDataService } from './sum-tree-mock-data.service';

describe('SumTreeMockDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SumTreeMockDataService]
    });
  });

  it('should be created', inject([SumTreeMockDataService], (service: SumTreeMockDataService) => {
    expect(service).toBeTruthy();
  }));
});
