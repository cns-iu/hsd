import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/from';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';

import { bind as Bind } from 'bind-decorator';

import {
  Node, SingleNode, SummaryNode,
  ConceptType, VisibilityType,
  normalizePath,
  stringToConcept, stringToVisibility, stringToIsSynonym,
  parentPathFor
} from './node';

import { nodes, subtreeBreakdown } from './mock-data';

function rawNodeToSingleNode(node: any): SingleNode {
  return {
    type: 'SingleNode',
    level: node['NodeLevel'],
    path: normalizePath(node['NodePath']),
    label: node['NodeName'],
    info: {
      concept: stringToConcept(node['NodeType']),
      visibility: stringToVisibility(node['NodeVisibility']),
      isSynonym: stringToIsSynonym(node['NodeIsSynonym']),
      hasMetaData: false,
      numPaths: +node['NumberOfPaths']
    }
  };
}

@Injectable()
export class SumTreeDataService {
  constructor() { }

  @Bind
  queryNode(path: string): Observable<SingleNode> {
    path = normalizePath(path);
    return Observable.from(nodes).filter((node) => {
      return normalizePath(node['NodePath']) === path;
    }).map(rawNodeToSingleNode);
  }

  @Bind
  queryChildNodes(path: string): Observable<SingleNode> {
    path = normalizePath(path);
    return Observable.from(nodes).filter((node) => {
      return parentPathFor(normalizePath(node['NodePath'])) === path;
    }).map(rawNodeToSingleNode);
  }

  @Bind
  querySummaryNodes(path: string): Observable<SummaryNode> {
    path = normalizePath(path);
    return Observable.of(); // TODO
  }
}
