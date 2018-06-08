import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { forkJoin } from 'rxjs/observable/forkJoin';
import { map } from 'rxjs/operators';
import { bind as Bind } from 'bind-decorator';
import * as x2js from 'x2js';

import { SingleNode, NodeInfo, normalizePath, SummaryNode } from './node';
import { EndpointData } from './endpoint-data';
import { SumTreeDataService } from './sum-tree-data.service';


@Injectable()
export class SumTreeEndpointDataService implements SumTreeDataService{
  private baseUrl = 'http://weber.hms.harvard.edu/HealthcareSystemDynamics/SumTreePCORI/GetChildren.asp?parent=';

  constructor(private http: HttpClient) {
    this.queryNodes([
      '\\pcori',
      '\\pcori\\demographic',
      '\\pcori\\diagnosis',
      '\\pcori\\encounter',
      '\\pcori\\enrollment',
      '\\pcori\\lab_result_cm',
      '\\pcori\\medication',
      '\\pcori\\procedure',
      '\\pcori\\procedure\\09',
      '\\pcori\\procedure\\10',
      '\\pcori\\procedure\\11',
      '\\pcori\\procedure\\ch',
      '\\pcori\\procedure\\lc',
      '\\pcori\\procedure\\nd',
      '\\pcori\\procedure\\re',
      '\\pcori\\procedure\\version',
      '\\pcori\\vital'
    ]).subscribe((t) => console.log(t)); // Temp for testing
  }

  @Bind
  queryNodes(paths: string | string[]): Observable<SingleNode[]> {
    return this.getRawDataNodes(paths).map((conceptLists) => {
      console.log('singlenode', conceptLists);
      return [].concat(...conceptLists.map((c) => c.singleNodes));
    });
  }

  @Bind
  queryChildNodes(paths: string | string[]): Observable<SingleNode[]> {
    return Observable.of([]);
    // FIXME
    // return this.queryNodes(paths);
  }

  @Bind
  querySummaryNodes(paths: string | string[]): Observable<SummaryNode[]> {
    return this.getRawDataNodes(paths).map((conceptLists) => {
      console.log('summarynode', conceptLists);
      return [].concat(...conceptLists.map((c) => c.summaryNodes));
    });
  }

  @Bind
  private getRawDataNodes(paths: string | string[]): Observable<EndpointData[]> {
    paths = ['\\', '\\PCORI\\', '\\PCORI\\PROCEDURE\\'];
    return forkJoin(...paths.map(this.queryEndpoint));
  }

  @Bind
  private queryEndpoint(path: string): Observable<EndpointData> {
    return this.http.get(this.baseUrl + path, { responseType: 'text' })
      .map((xml) => new EndpointData(xml));
  }
}
