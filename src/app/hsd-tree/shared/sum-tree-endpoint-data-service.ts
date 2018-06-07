import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { forkJoin } from 'rxjs/observable/forkJoin';
import { map } from 'rxjs/operators';

import { bind as Bind } from 'bind-decorator';

import * as x2js from 'x2js';

import {
  Node, NodeInfo, SingleNode, SummaryNode,
  ConceptType, VisibilityType,
  normalizePath,
  stringToConcept, stringToVisibility, stringToIsSynonym, stringToHasMetaData,
  parentPathFor
} from './node';

import { nodes, subtreeBreakdown } from './mock-data';
import { Summary } from '@angular/compiler';

function makePathFilter(
  paths: string | string[], field: string, modifier?: (path: string) => string
): (node: any) => boolean {
  paths = Array.isArray(paths) ? paths : [paths];
  paths = paths.map(normalizePath);

  if (modifier === undefined) {
    return (node) => paths.includes(normalizePath(node[field]));
  } else {
    return (node) => paths.includes(modifier(normalizePath(node[field])));
  }
}


@Injectable()
export class SumTreeEndpointDataService {
  private baseUrl = 'http://weber.hms.harvard.edu/HealthcareSystemDynamics/SumTreePCORI/GetChildren.asp?parent=';

  constructor(private http: HttpClient) {
    this.queryNodes().subscribe((t) => console.log(t)); // Temp for testing
    this.getRawDataNodes().subscribe((p) => console.log(p)); // Temp for testing (xml response to js)
  }

  getRawDataNodes() {
    const level0 = this.http
      .get(this.baseUrl + '\\', { responseType: 'text' })
        .map(r => this.parseData(r));
    const level1 = this.http
      .get(this.baseUrl + '\\PCORI\\', { responseType: 'text' })
        .map(r => this.parseData(r));
    const level2 = this.http
      .get(this.baseUrl + '\\PCORI\\PROCEDURE\\', { responseType: 'text' })
        .map(r => this.parseData(r));

    return forkJoin(level0, level1, level2);
  }

  parseData(response: string): any {
    return new x2js().xml2js(response);
  }

  queryNodes(): Observable<SingleNode[]> {
    return this.getRawDataNodes().map(
      (conceptLists) => conceptLists.map(
        (c) => {
         if (Array.isArray(c['ConceptList'].Concept)) {
            return c['ConceptList'].Concept.map(
              (concept) => this.rawNodeToSingleNode(concept)
            );
          } else {
            return Array.of(this.rawNodeToSingleNode(c['ConceptList'].Concept));
          }
        }
      )
    );
  }

  querySummaryNodes(paths: string | string[]): Observable<SummaryNode[]> {
    const pathFilter = makePathFilter(paths, '_Path');
    return null;
  }

  rawNodeToSingleNode(node: any): SingleNode {
    const path = normalizePath(node['_Path']);
    const isLeaf = (node['_Type'] === 'Leaf') ? true : false; // TODO

    return {
      type: 'SingleNode',
      level: node['_Level'],
      path: path,
      label: node['_Name'],
      isLeaf: isLeaf,
      info: {
        concept: stringToConcept(node['_Type']),
        visibility: stringToVisibility(node['_Status']),
        isSynonym: stringToIsSynonym(this.abbreviate(node['_Synonym'])),
        hasMetaData: stringToHasMetaData(this.abbreviate(node['_Metadata'])),
        numPaths: 0, // TODO
        tableName: node['_Table'] || ''
      }
    };
  }

  abbreviate(value: string): string {
    switch (value) {
      case 'Yes': return 'Y';
      case 'No': return 'N';
    }
  }

}
