import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/from';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toArray';

import { bind as Bind } from 'bind-decorator';

import {
  Node, NodeInfo, SingleNode, SummaryNode,
  ConceptType, VisibilityType,
  normalizePath,
  stringToConcept, stringToVisibility, stringToIsSynonym, stringToHasMetaData,
  parentPathFor
} from './node';

import { nodes, subtreeBreakdown } from './mock-data';

function normalizeAllPaths(paths: string | string[]): string[] {
  paths = Array.isArray(paths) ? paths : [paths];
  return paths.map(normalizePath);
}

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
      hasMetaData: stringToHasMetaData(node['NodeHasMetadataXML']),
      numPaths: +node['NumberOfPaths']
    }
  };
}

function rawSummaryNodeToSummaryNodeInfo(node: any): NodeInfo {
  return {
    concept: stringToConcept(node['ConceptType']),
    visibility: stringToVisibility(node['Visibility']),
    isSynonym: stringToIsSynonym(node['IsSynonym']),
    hasMetaData: stringToHasMetaData(node['HasMetadataXML']),
    numPaths: +node['NumberOfPaths']
  };
}

@Injectable()
export class SumTreeDataService {
  constructor() { }

  @Bind
  queryNodes(paths: string | string[]): Observable<SingleNode[]> {
    paths = normalizeAllPaths(paths);
    return Observable.from(nodes).filter((node) => {
      return paths.includes(normalizePath(node['NodePath']));
    }).map(rawNodeToSingleNode).toArray();
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

    const entries = (subtreeBreakdown as any[]).filter((node) => {
      return normalizePath(node['NodePath']) === path;
    });
    const byLevel = entries.reduce((acc, node) => {
      const level = node['SubtreeLevel'];
      const nodesAcc = acc[level] || (acc[level] = []);
      nodesAcc.push(node);

      return acc;
    }, {});
    const summaryNodes = Object.entries(byLevel).filter(([level]) => !isNaN(+level)).map(([level, acc]) => {
      const breakdown = acc.map(rawSummaryNodeToSummaryNodeInfo);
      return {
        type: 'SummaryNode',
        level: +level,
        path: path,
        breakdown: breakdown
      } as SummaryNode;
    });


    return Observable.from(summaryNodes);
  }
}
