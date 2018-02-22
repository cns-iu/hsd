import {
  Node, NodeInfo, SingleNode, SummaryNode,
  ConceptType, VisibilityType
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
  totalNumPaths: number;
  multiplier: number;

  breakdown: InternalSummaryNodeInfo[];
}


// Calculate and set fields
// InternalSingleNode
export function setSingleNodeColor(
  type: ConceptType, node: InternalSingleNode
): void {
  // TODO
}

export function setSingleNodeOpacity(
  type: VisibilityType, node: InternalSingleNode
): void {
  // TODO
}


// InternalSummaryNode
export function setSummaryNodeTotalNumPaths(node: InternalSummaryNode): void {
  node.totalNumPaths = node.breakdown.reduce((sum, info) => sum + info.numPaths, 0);
}

export function setSummaryNodeMultiplier(
  totalNumPaths: number, node: InternalSummaryNode
): void {
  // TODO is this correct?
  node.multiplier = node.totalNumPaths / totalNumPaths;
}


// InternalSummaryNodeInfo
export function setSummaryNodeInfoPercentage(
  type: string, node: InternalSummaryNode
): void {
  // TODO
}

export function setSummaryNodeInfoCumPercentage(
  node: InternalSummaryNode
): void {
  node.breakdown.reduce((current, info) => {
    info.cumPercentage = current;
    return current + info.percentage;
  }, 0);
}

export function setSummaryNodeInfoColor(
  type: ConceptType, node: InternalSummaryNode
): void {
  // TODO
}

export function setSummaryNodeInfoOpacity(
  type: VisibilityType, node: InternalSummaryNode
): void {
  // TODO
}
