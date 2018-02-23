import * as nodeClickSignal from './node-click.json';
import * as summaryClickSignal from './summary-click.json';

import * as summaryTypeSignal from './summary-type.json';
import * as colorSignal from './color.json';
import * as opacitySignal from './opacity.json';

export const nodeClickName: string = nodeClickSignal['name'];
export const summaryClickName: string = summaryClickSignal['name'];
export const  summaryTypeName: string = summaryTypeSignal['name'];
export const colorName: string = colorSignal['name'];
export const opacityName: string = opacitySignal['name'];

export default [].concat(
  nodeClickSignal, summaryClickSignal,
  summaryTypeSignal, colorSignal, opacitySignal
);
