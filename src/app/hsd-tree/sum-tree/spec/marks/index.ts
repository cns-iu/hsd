import * as singleNodesSymbols from './single-nodes-symbols.json';
import * as singleNodesNames from './single-nodes-names.json';
import * as singleNodesValues from './single-nodes-values.json';

import * as summaryNodesSymbols from './summary-nodes-symbols.json';
import * as summaryNodesNames from './summary-nodes-names.json';

import * as links from './links.json';

export default [].concat(
  links, // (D) [singleNodesLinks, summaryNodesLinks]

  singleNodesSymbols, // (D) [singleNodesTree]
  singleNodesNames, // (D) [singleNodesTree]
  singleNodesValues, // (D) [singleNodesTree]

  summaryNodesSymbols, // (D) [summaryNodesTree, barBreakdown]
  summaryNodesNames // (D) [summaryNodesTree]
);
