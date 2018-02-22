import {
  Node, NodeInfo, SingleNode, SummaryNode
} from '../shared/node';

export type InternalNode = InternalSingleNode | InternalSummaryNode;

export interface InternalSingleNode extends SingleNode {
  color: string;
  opacity: number;
}

export interface InternalSummaryNodeInfo extends NodeInfo {
  percentage: number;
  cumPercentage: number;

  color: string;
  opacity: number;
}

export interface InternalSummaryNode extends SummaryNode {
  multiplier: number;
  totalNumPaths: number;

  breakdown: InternalSummaryNodeInfo[];
}
