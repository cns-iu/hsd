import { TestBed, inject } from '@angular/core/testing';

import { SumTreeService } from './sum-tree.service';

describe('DinoSumTreeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SumTreeService]
    });
  });

  it('should be created', inject([SumTreeService], (service: SumTreeService) => {
    expect(service).toBeTruthy();
  }));
});
