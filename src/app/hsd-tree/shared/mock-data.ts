import { read as vegaRead } from 'vega';
import { subtreeBreakdownCsv } from './mock-data-breakdown-csv';
import { nodesCsv } from './mock-data-nodes-csv';

export const subtreeBreakdown = vegaRead(subtreeBreakdownCsv, {
  type: 'csv',
  parse: {
    NodeLevel: 'integer',
    SubtreeLevel: 'integer',
    NumberOfPaths: 'integer'
  }
}).filter((item) => {
    return item.NodeLevel != null && !Number.isNaN(item.NodeLevel);
});

export const nodes = vegaRead(nodesCsv, {
  type: 'csv',
  parse: {
    NodeLevel: 'integer',
    NumberOfPaths: 'integer'
  }
}).filter((item) => {
  return item.NodeLevel != null && !Number.isNaN(item.NodeLevel);
});
