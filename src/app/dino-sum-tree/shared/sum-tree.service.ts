import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { NodeInfo, SummaryInfo } from './node';

@Injectable()
export abstract class SumTreeService {
  constructor() { }

  // Querying
  abstract queryChildIds(id: string): Observable<string>;
  abstract queryNodeInfo(id: string): Observable<NodeInfo>;
  abstract querySummaryInfo(id: string): Observable<SummaryInfo>;

  // Tree utility
  parentIdFor(id: string): string | null {
    return null; // TODO
  }

  isParentOf(parentId: string, id: string): boolean {
    return false; // TODO
  }

  isAncestorOf(ancestorId: string, id: string): boolean {
    return false; // TODO
  }
}
