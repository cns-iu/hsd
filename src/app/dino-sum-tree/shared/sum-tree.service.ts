import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';


export interface NodeInfo {
  id: string;
  expandable?: boolean;
}

export interface SummaryInfo {
  id: string;
  partitions: SummaryPartition[];
}

export interface SummaryPartition {
  percentage: number;
}


@Injectable()
export abstract class SumTreeService {
  constructor() { }

  // Tree data
  abstract queryChildIds(id: string): Observable<string>;
  abstract queryNodeInfo(id: string): Observable<NodeInfo>;
  abstract querySummaryInfo(id: string): Observable<SummaryInfo>;
}
