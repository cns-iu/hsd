import {
  Node, NodeInfo, SingleNode, SummaryNode,
  ConceptType, VisibilityType
} from '../shared/node';

import { getNodeInfoColor, getNodeInfoOpacity, getSingleNodeTooltip, getSummaryNodeBreakdownTooltip } from '../shared/node-encodings';

export type InternalNode = InternalSingleNode | InternalSummaryNode;

export interface InternalSingleNode extends SingleNode {
  color: string;
  opacity: number;
  tooltip: string;
}

export interface InternalSummaryNodePartition {
  numPaths: number;

  percentage: number;
  cumPercentage: number;

  color: string;
  opacity: number;
  groupingKey?: string;
}

export interface InternalSummaryNode extends SummaryNode {
  label: string;
  totalNumPaths: number;
  cumulativeTotalNumPaths: number;
  byLevelTotalNumPaths: number;
  multiplier: number;
  tooltip: string;

  partitions: InternalSummaryNodePartition[];
}


export interface InternalSingleNodeOptions {
  colorField?: string;
  opacityField?: string;
  tooltipField?: string;
  summaryType?: string;
}

export interface InternalSummaryNodeOptions {
  colorField?: string;
  opacityField?: string;
  tooltipField?: string;
  summaryType?: string;
}

function groupBy(items: any[], field: string): {} {
  return items.reduce((acc, item) => {
    const key = item[field];
    const group = acc[key] || (acc[key] = []);

    group.push(item);
    return acc;
  }, {});
}

// Initialization
export function convertToInternalSingleNode(
  node: SingleNode, options: InternalSingleNodeOptions
): InternalSingleNode {
  const inode = node as InternalSingleNode;

  inode.color = getNodeInfoColor(inode.info, options.colorField);
  inode.opacity = getNodeInfoOpacity(inode.info, options.opacityField);
  inode.tooltip = getSingleNodeTooltip(inode, options.summaryType, options.tooltipField);

  return inode;
}

export function convertToInternalSummaryNode(
  node: SummaryNode, options: InternalSummaryNodeOptions
): InternalSummaryNode {
  const inode = node as InternalSummaryNode;
  inode.multiplier = 1;
  inode.partitions = inode.breakdown as any[];

  const totalNumPaths = inode.breakdown.reduce((acc, b) => acc + b.numPaths, 0);
  inode.byLevelTotalNumPaths = totalNumPaths;

  if (options.summaryType === 'byLevel') {
    inode.totalNumPaths = totalNumPaths;
    inode.cumulativeTotalNumPaths = 0; // Don't compute it if we don't need it.
  } else {
    inode.cumulativeTotalNumPaths = totalNumPaths;
    let cumNode = inode.next;
    while (cumNode !== null) {
      inode.cumulativeTotalNumPaths += cumNode.breakdown.reduce((acc, b) => acc + b.numPaths, 0);
      inode.partitions = inode.partitions.concat(cumNode.breakdown as any[]);
      cumNode = cumNode.next;
    }
    inode.totalNumPaths = inode.cumulativeTotalNumPaths;
  }

  inode.partitions.forEach((part: any) => {
    part.color = getNodeInfoColor(part, options.colorField);
    part.opacity = getNodeInfoOpacity(part, options.opacityField);
    part.tooltip = getSummaryNodeBreakdownTooltip(node, part, options.summaryType, options.tooltipField);

    part.groupingKey = '' + (part.opacity * 100) + '_' + part.color;
  });

  if (options.summaryType === 'cumulative') {
    const byPartition = groupBy(inode.partitions, 'groupingKey');
    inode.partitions = Object.entries(byPartition).map(([part, parts]) => {
      parts[0].numPaths = (parts as any[]).reduce((acc, b) => acc + b.numPaths, 0);
      return parts[0];
    });
  }

  inode.partitions.reduce((acc, b) => {
    b.percentage = b.numPaths / inode.totalNumPaths;
    b.cumPercentage = acc;
    return acc + b.percentage;
  }, 0);


  inode.label = '' + inode.totalNumPaths;

  return inode;
}
