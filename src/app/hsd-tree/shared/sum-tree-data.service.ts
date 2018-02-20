import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/from';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';

import {
  Node, SummaryNode,
  ConceptType, VisibilityType,
  normalizePath,
  stringToConcept, stringToVisibility, stringToIsSynonym
} from './node';

import { nodes, subtreeBreakdown } from './mock-data';

function isParentPath(path: string, parentPath: string): boolean {
  if (path === parentPath || !path.startsWith(parentPath)) {
    return false;
  } else {
    const end = path.slice(parentPath.length + 2);
    return !end.includes('\\');
  }
}

function rawNodeToNode(node: any): Node {
  return {
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

  getInitialNodes(): Node[] {
    return nodes.filter((node) => {
      return '\\pcori' === normalizePath(node['NodePath']);
    }).map((node) => {
      return rawNodeToNode(node);
    });
  }

  queryChildNodes(path: string): Observable<Node> {
    path = normalizePath(path);

    return Observable.from(nodes).filter((node) => {
      return isParentPath(normalizePath(node['NodePath']), path);
    }).map((node) => {
      return {
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
    });
  }

  querySummaryNodes(path: string): Observable<SummaryNode> {
    return Observable.of();
  }
}
