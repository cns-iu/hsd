import * as nodesDataSet from './nodes.json';
import * as summariesDataSet from './summaries.json';

export const nodesName: string = nodesDataSet['name'];
export const summariesName: string = summariesDataSet['name'];

export default [].concat(
  nodesDataSet, summariesDataSet
);
