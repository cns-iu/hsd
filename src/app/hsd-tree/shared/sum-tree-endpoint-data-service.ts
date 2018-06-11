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
import { PathData, PathDataCache } from './path-data-cache';

@Injectable()
export class SumTreeEndpointDataService implements SumTreeDataService {
  private baseUrl = 'http://weber.hms.harvard.edu/HealthcareSystemDynamics/SumTreePCORI/GetChildren.asp?parent=';
  private cache = new PathDataCache();
  private seenPath = {};

  constructor(private http: HttpClient) { }

  @Bind
  queryNodes(paths: string | string[]): Observable<SingleNode[]> {
    return this.getPathData(paths).map((results) => {
      return results.map((pathData) => pathData.singleNode).filter(d => !!d);
    });
  }

  @Bind
  queryChildNodes(paths: string | string[]): Observable<SingleNode[]> {
    return this.getPathData(paths).map((results) => {
      return [].concat(...results.map((pathData) => {
        return (pathData.childPaths || []).map((child) => this.cache.getPathData(child).singleNode);
      })).filter(d => !!d);
    });
  }

  @Bind
  querySummaryNodes(paths: string | string[]): Observable<SummaryNode[]> {
    return this.getPathData(paths).map((results) => {
      return [].concat(...results.map((pathData) => pathData.summaryNodes)).filter(d => !!d);
    });
  }

  @Bind
  private getPathData(paths: string | string[], queryChildren = false): Observable<PathData[]> {
    const allPaths = (Array.isArray(paths) ? paths : [paths]);
    const queryPaths = allPaths.concat(this.getParentPaths(allPaths));
    return this.getRawDataNodes(queryPaths).map((results) => {
      results.filter(ep => !!ep).forEach((endpointData, index) => {
        this.cache.addChildData(queryPaths[index], endpointData);
      });
      return allPaths.map(this.cache.getPathData);
    });
  }

  @Bind
  private getRawDataNodes(paths: string[]): Observable<EndpointData[]> {
    return forkJoin(...(Array.isArray(paths) ? paths : [paths]).map(this.queryEndpoint));
  }

  @Bind
  private queryEndpoint(path: string): Observable<EndpointData> {
    if (!this.seenPath.hasOwnProperty(path)) {
      this.seenPath[path] = true;
      return this.rawQueryEndpoint(path);
    } else {
      return Observable.of(null);
    }
  }

  private rawQueryEndpoint(path: string): Observable<EndpointData> {
    path = path.endsWith('\\') ? path : (path + '\\');
    return this.http.get(this.baseUrl + path, { responseType: 'text' })
      .map((xml) => new EndpointData(xml));
  }

  private getParentPaths(paths: string | string[]): string[] {
    const parents = {};
    for (const path of (Array.isArray(paths) ? paths : [paths])) {
      const parent = normalizePath(path).split('\\').slice(0, -1).join('\\');
      parents[parent] = true;
    }
    return Object.keys(parents);
  }
}
