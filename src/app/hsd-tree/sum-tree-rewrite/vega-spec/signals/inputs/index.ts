import * as maxLevelSignal from './max-level.json';

import * as yMultiplierSignal from './y-multiplier.json';
import * as yOffsetSignal from './y-offset.json';

export const maxLevelName: string = maxLevelSignal['name'];
export const yMultiplierName: string = yMultiplierSignal['name'];
export const yOffsetName: string = yOffsetSignal['name'];

export default [].concat(
  maxLevelSignal,
  yMultiplierSignal, yOffsetSignal
);
