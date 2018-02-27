import { TestBed, inject } from '@angular/core/testing';

import { SumTreeDataService } from './sum-tree-data.service';

describe('SumTreeDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SumTreeDataService]
    });
  });

  it('should be created', inject([SumTreeDataService], (service: SumTreeDataService) => {
    expect(service).toBeTruthy();
  }));
});
