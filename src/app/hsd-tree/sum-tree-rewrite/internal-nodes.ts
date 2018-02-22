import {
  Node, NodeInfo, SingleNode, SummaryNode,
  ConceptType, VisibilityType
} from '../shared/node';

export type InternalNode = InternalSingleNode | InternalSummaryNode;

export interface InternalSingleNode extends SingleNode {
  color: string;
  opacity: number;
}

export interface InternalSummaryNodePartition {
  numPaths: number;

  percentage: number;
  cumPercentage: number;

  color: string;
  opacity: number;
}

export interface InternalSummaryNode extends SummaryNode {
  totalNumPaths: number;
  multiplier: number;

  partitions: InternalSummaryNodePartition[];
}


// Initialization
export function convertToInternalSingleNode(
  node: SingleNode // TODO additional arguments
): InternalSingleNode {
  const inode = node as InternalSingleNode;
  // TODO

  return inode;
}

export function convertToInternalSummaryNode(
  node: SummaryNode // TODO additional arguments
): InternalSummaryNode {
  const inode = node as InternalSummaryNode;

  // TODO temporary remove when fixed
  inode.totalNumPaths = inode.breakdown.reduce((acc, b) => acc + b.numPaths, 0);
  inode.multiplier = 1;
  inode.partitions = inode.breakdown as any[];
  inode.partitions.reduce((acc, b) => {
    b.percentage = b.numPaths / inode.totalNumPaths;
    b.cumPercentage = acc;
    return acc + b.percentage;
  }, 0);

  // TODO

  return inode;
}
