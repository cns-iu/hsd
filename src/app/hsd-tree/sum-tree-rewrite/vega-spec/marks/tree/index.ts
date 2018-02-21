import singleNodeMarks from './single-nodes';
import summaryNodeMarks from './summary-nodes';

import * as linkMarks from './links.json';

export default [].concat(
  // Links must be inserted before node symbols to get the correct z-ordering
  linkMarks,
  singleNodeMarks, summaryNodeMarks
);
