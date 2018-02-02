import * as nodeLookup from './node-lookup.json';
import * as barBreakdown from './bar-breakdown.json';

import * as levelSequence from './level-sequence.json';
import * as barValueTotals from './bar-value-totals.json';

import * as singleNodes from './single-nodes.json';
import * as singleNodeLeafs from './single-node-leafs.json';
import * as singleNodesTree from './single-nodes-tree.json';
import * as singleNodesLinks from './single-nodes-links.json';

import * as summaryNodes from './summary-nodes.json';
import * as summaryNodesTree from './summary-nodes-tree.json';
import * as summaryNodesLinks from './summary-nodes-links.json';

// Abbreviations
// (E) - External data source
// (D) [names] - Data dependencies
// (S) [names] - Signals created

export default [].concat(
  nodeLookup, // (E)
  barBreakdown, // (E)

  levelSequence, // (D) [barBreakdown] (S) [levelExtent]
  barValueTotals, // (D) [barBreakdown]

  singleNodes, // (D) [barBreakdown, nodeLookup]
  singleNodeLeafs, // (D) [singleNodes]
  singleNodesTree, // (D) [singleNodes, nodeLookup, levelExtent]
  singleNodesLinks, // (D) [singleNodesTree]

  summaryNodes, // (D) [barValueTotals, singleNodeLeafs]
  summaryNodesTree, // (D) [summaryNodes, singleNodesTree, levelExtent] (S) [countExtent]
  summaryNodesLinks // (D) [summaryNodesTree, levelExtent]
);
