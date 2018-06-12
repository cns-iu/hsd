import * as X2JS from 'x2js';
import { bind as Bind } from 'bind-decorator';

import {
  Node, NodeInfo, SingleNode, SummaryNode, ConceptType, VisibilityType,
  normalizePath, stringToConcept, stringToVisibility, stringToIsSynonym,
  stringToHasMetaData, parentPathFor
} from './node';

function groupBy(items: any[], field: string): {} {
  return items.reduce((acc, item) => {
    const key = item[field];
    const group = acc[key] || (acc[key] = []);

    group.push(item);
    return acc;
  }, {});
}

export class EndpointData {
  private x2js: X2JS = new X2JS({ignoreRoot: true});
  readonly data: any;
  readonly rawNodes: any[];
  readonly singleNodes: SingleNode[];
  readonly summaryNodes: SummaryNode[];

  constructor(public xmlString: string) {
    this.data = this.x2js.xml2js(xmlString);
    this.rawNodes = this.getRawNodes(this.data, 'Concept');
    this.singleNodes = this.rawNodes.map(this.rawNodeToSingleNode.bind(this));
    this.summaryNodes = [].concat(...this.rawNodes.map(this.rawNodeToSummaryNode.bind(this)));
  }

  private getRawNodes(data: any, field: string): any[] {
    if (!data || !data[field]) {
      return [];
    } else if (Array.isArray(data[field])) {
      return data[field];
    } else {
      return Array.of(data[field]);
    }
  }

  private rawNodeToSingleNode(node: any): SingleNode {
    const path = normalizePath(node['_Path']);
    const isLeaf = (node['_Type'] === 'Leaf') ? true : false; // TODO
    return {
      type: 'SingleNode',
      level: +node._Level,
      path: path,
      label: node['_Name'],
      isLeaf: isLeaf,
      info: {
        concept: stringToConcept(node['_Type']),
        visibility: stringToVisibility(node['_Status']),
        isSynonym: stringToIsSynonym(this.abbreviate(node['_Synonym'])),
        hasMetaData: stringToHasMetaData(this.abbreviate(node['_Metadata'])),
        numPaths: 0, // Computed on the fly based on user settings
        tableName: node['_Table'] || ''
      }
    };
  }

  private rawNodeToSummaryNode(conceptNode: any): SummaryNode[] {
    const conceptLevel = +conceptNode._Level;
    const conceptPath = normalizePath(conceptNode._Path);

    const summaryNodes = this.getRawNodes(conceptNode, 'Subtree').map((rawSumNode) => {
      return <SummaryNode>{
        'type': 'SummaryNode',
        'level': +rawSumNode._Level,
        'path': conceptPath,
        'breakdown': this.getRawNodes(rawSumNode, 'Summary').map((node) => {
          return <NodeInfo>{
            concept: stringToConcept(node['_Type']),
            visibility: stringToVisibility(node['_Status']),
            isSynonym: stringToIsSynonym(this.abbreviate(node['_Synonym'])),
            hasMetaData: stringToHasMetaData(this.abbreviate(node['_Metadata'])),
            numPaths: +node['_NumberOfConcepts'],
            tableName: node['_Table'] || ''
          };
        })
      };
    });
    summaryNodes.sort((a, b) => a.level - b.level);
    summaryNodes.forEach((node, index, acc) => {
      node.next = index === acc.length - 1 ? null : acc[index + 1];
    });

    return summaryNodes;
  }

  private abbreviate(value: string): string {
    switch (value) {
      case 'Yes': return 'Y';
      case 'No': return 'N';
      default: return 'N';
    }
  }
}
