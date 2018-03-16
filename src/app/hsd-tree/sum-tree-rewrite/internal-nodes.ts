import {
  Node, NodeInfo, SingleNode, SummaryNode,
  ConceptType, VisibilityType
} from '../shared/node';

import {
  getNodeInfoColor,
  getNodeInfoOpacity,
  getNodeColorText,
  getNodeOpacityText,
  getSingleNodeTooltip,
  getSummaryNodeBreakdownTooltip
} from '../shared/node-encodings';

export type InternalNode = InternalSingleNode | InternalSummaryNode;

export interface InternalSingleNode extends SingleNode {
  color: string;
  opacity: number;
  tooltip: string;

  Color: string; // color encoding value for tooltip
  Opacity: string; // opacity encoding value for tooltip
  Concepts: number; // #Concepts for tooltip
}

export interface InternalSummaryNodePartition {
  numPaths: number;

  percentage: number;
  cumPercentage: number;

  color: string;
  opacity: number;
  tooltip: string;

  Color: string; // color encoding value for tooltip
  Opacity: string; // opacity encoding value for tooltip
  Concepts: number; // #Concepts for tooltip

  groupingKey?: string;
}

export interface InternalSummaryNode extends SummaryNode {
  label: string;
  totalNumPaths: number;
  cumulativeTotalNumPaths: number;
  byLevelTotalNumPaths: number;
  numPathsRef: {max: number};
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
  numPathsRef?: {[path: string]: number, max: number};
}

function groupBy<T>(items: T[], field: string): {[key: string]: T[]} {
  return items.reduce((acc, item) => {
    const key = item[field];
    const group = acc[key] || (acc[key] = []);

    group.push(item);
    return acc;
  }, {});
}

function updateNumPathsRef(
  ref: {[path: string]: number, max: number}, path: string, value: number
): void {
  ref[path] = Math.max(ref[path] || 0, value);

  if (ref.max < 0) {
    ref.max = Object.entries(ref).reduce((acc, [, max]) => {
      return Math.max(acc, max);
    }, 0);
  } else {
    ref.max = Math.max(ref.max, ref[path]);
  }
}

// Initialization
export function convertToInternalSingleNode(
  node: SingleNode, options: InternalSingleNodeOptions
): InternalSingleNode {
  const inode = node as InternalSingleNode;

  inode.color = getNodeInfoColor(inode.info, options.colorField);
  inode.opacity = getNodeInfoOpacity(inode.info, options.opacityField);
  inode.tooltip = getSingleNodeTooltip(inode, options.summaryType, options.tooltipField); // not in use as tooltip field
  inode.Color = getNodeColorText(inode.info, options.colorField);
  inode.Opacity = getNodeOpacityText(inode.info, options.opacityField);
  inode.Concepts = 1;
  return inode;
}

export function convertToInternalSummaryNode(
  node: SummaryNode, options: InternalSummaryNodeOptions
): InternalSummaryNode {
  const inode = node as InternalSummaryNode;

  // Calculate path counts
  if (inode.byLevelTotalNumPaths === undefined) {
    inode.byLevelTotalNumPaths = inode.breakdown.reduce((acc, b) => {
      return acc + b.numPaths;
    }, 0);
  }

  if (options.summaryType === 'byLevel') {
    inode.totalNumPaths = inode.byLevelTotalNumPaths;
  } else if (options.summaryType === 'cumulative') {
    if (inode.cumulativeTotalNumPaths === undefined) {
      let total = inode.byLevelTotalNumPaths;
      let next = inode.next as InternalSummaryNode;

      if (next != null && next.cumulativeTotalNumPaths !== undefined) {
        total += next.cumulativeTotalNumPaths;
      } else {
        while (next != null) {
          total += (next.byLevelTotalNumPaths ||
            (next.byLevelTotalNumPaths = next.breakdown.reduce((acc, b) => {
              return acc + b.numPaths;
            }, 0)));
          next = next.next as InternalSummaryNode;
        }
      }

      inode.cumulativeTotalNumPaths = total;
    }

    inode.totalNumPaths = inode.cumulativeTotalNumPaths;
  }

  // Update numPathsRef
  inode.numPathsRef = options.numPathsRef;
  updateNumPathsRef(options.numPathsRef, inode.path, inode.totalNumPaths);

  // Create partitions
  let breakdowns = inode.breakdown;
  if (options.summaryType === 'cumulative') {
    let next = inode.next;
    while (next != null) {
      breakdowns = breakdowns.concat(next.breakdown);
      next = next.next;
    }
  }

  const groups = groupBy(breakdowns.map((b) => {
    const color = getNodeInfoColor(b, options.colorField);
    const opacity = getNodeInfoOpacity(b, options.opacityField);
    const id = '' + color + '@' + Math.trunc(opacity * 100);
    const Color  = getNodeColorText(b, options.colorField);
    const Opacity = getNodeOpacityText(b, options.opacityField);

    return {
      id, color, opacity,
      info: b, Color, Opacity
    };
  }), 'id');

  inode.partitions = Object.entries(groups).map(([, blist]) => blist)
    .map((blist, index) => blist.reduce((acc, b) => {
      acc.numPaths += b.info.numPaths;
      if (acc.color === undefined) {
        acc.color = b.color;
        acc.opacity = b.opacity;
        acc.Color = b.Color;
        acc.Opacity = b.Opacity;
      }

      return acc;
    }, {
      numPaths: 0,
      percentage: 0,
      cumPercentage: 0,
      color: undefined,
      opacity: undefined,
      tooltip: undefined,
      Color: undefined,
      Opacity: undefined,
      Concepts: undefined
    }));

  const totalNumPaths = inode.partitions.reduce((acc, p) => {
    return acc + p.numPaths;
  }, 0);
  inode.partitions.reduce((acc, p) => {
    p.percentage = p.numPaths / totalNumPaths;
    p.cumPercentage = acc;
    return acc + p.percentage;
  }, 0);

  inode.partitions.forEach((p) => {
    p.tooltip = getSummaryNodeBreakdownTooltip(
      inode, p as any, options.summaryType, options.tooltipField
    ); // not in use as tooltip field
    p.Concepts = p.numPaths; // #Concepts on tooltip
  });

  inode.label = '' + inode.totalNumPaths;
  return inode;
}

export function calculateMultiplier(ref: {max: number}, nodes: InternalSummaryNode[]): void {
  nodes.forEach((node) => {
    node.multiplier = Math.log(Math.max(1, 100 * node.totalNumPaths / ref.max)) / Math.log(100) * .75 + .25;
  });
}
