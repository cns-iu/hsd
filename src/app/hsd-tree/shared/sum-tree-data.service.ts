import { Observable } from 'rxjs/Observable';

import { SingleNode, SummaryNode } from './node';


export interface SumTreeDataService {
  queryNodes(paths: string | string[]): Observable<SingleNode[]>;
  queryChildNodes(paths: string | string[]): Observable<SingleNode[]>;
  querySummaryNodes(paths: string | string[]): Observable<SummaryNode[]>;
}
