import * as topLevel from './top-level.json';
import data from './data';
import signals from './signals';
import scales from './scales';
import axes from './axes';
import legends from './legends';
import marks from './marks';

export default Object.assign({}, topLevel, {
  data, signals, scales, axes, legends, marks
});
