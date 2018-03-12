import { Seq } from 'immutable';
import { isString } from 'lodash';


export class Node {
  readonly id: string;

  constructor(
    readonly parent: Node | null,
    readonly rawData: {id: string}
  ) {
    this.id = rawData.id;
  }

  private static getId(nodeOrId: Node | string): string {
    return isString(nodeOrId) ? nodeOrId : nodeOrId.id;
  }

  static isParentOf(parent: Node | string, node: Node): boolean {
    return node.parent !== null && node.parent.id === Node.getId(parent);
  }

  static isAncestorOf(ancestor: Node | string, node: Node): boolean {
    const ancestorId = Node.getId(ancestor);
    let current = node.parent;
    while (current !== null) {
      if (current.id === ancestorId) {
        return true;
      }

      current = current.parent;
    }

    return false;
  }

  static filterLeafs(nodes: Seq.Indexed<Node>): Seq.Indexed<Node>[] {
    //
  }
}

export interface SingleNode extends Node {
  expandable?: boolean;
}

export interface SummaryNode extends Node {
  partitions: SummaryNodePartition[];
}

export interface SummaryNodePartition {
  percentage: number;
}

export function leafs(nodes: Node[]): Node[] {
  const nodeMap = {};

  nodes.forEach((node) => {
    const { id, parent } = node;

    if (!(id in nodeMap)) {
      nodeMap[id] = node;
    }
    if (parent) {
      nodeMap[parent.id] = null;
    }
  });

  return Object.entries(nodeMap)
    .map(([, node]) => node)
    .filter((node) => node !== null) as Node[];
}
