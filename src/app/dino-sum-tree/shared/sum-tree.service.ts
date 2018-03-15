import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';


@Injectable()
export abstract class SumTreeService {
  constructor() { }

  // Tree data
  abstract queryChildIds(id: string): Observable<any>;
  abstract queryNodeInfo(id: string): Observable<any>;
  abstract querySummaryInfo(id: string): Observable<any>;
}
