import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { SingleNode, SummaryNode } from './node';

export abstract class SumTreeDataService {
  abstract queryNodes(paths: string | string[]): Observable<SingleNode[]>;
  abstract queryChildNodes(paths: string | string[]): Observable<SingleNode[]>;
  abstract querySummaryNodes(paths: string | string[]): Observable<SummaryNode[]>;
}
