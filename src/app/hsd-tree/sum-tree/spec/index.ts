import * as topLevel from './top-level.json';
import data from './data';
import scales from './scales';
import axes from './axes';
import legends from './legends';
import marks from './marks';

export default Object.assign({}, topLevel, {
  data, scales, axes, legends, marks
});
