import { isString } from 'lodash';


export interface Node {
  id: string;
  parent: Node | null;

  rawData: any;
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


// Internal Utility
function getId(node: Node | string): string {
  return isString(node) ? node as string : (node as Node).id;
}

// Utility
export function isParentOf(parent: Node | string, node: Node): boolean {
  return node.parent !== null && node.parent.id === getId(parent);
}

export function isAncestorOf(ancestor: Node | string, node: Node): boolean {
  const ancestorId = getId(ancestor);

  let current: Node | null = node;
  while (current !== null) {
    if (current.id === ancestorId) {
      return true;
    }

    current = current.parent;
  }

  return false;
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
