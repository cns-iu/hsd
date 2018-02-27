import * as nodeClickSignal from './node-click.json';
import * as summaryClickSignal from './summary-click.json';

export const nodeClickName: string = nodeClickSignal['name'];
export const summaryClickName: string = summaryClickSignal['name'];

export default [].concat(
  nodeClickSignal, summaryClickSignal
);
