import * as global from './global.json';
import data, { inputDataSetNames } from './data';
import signals, { inputSignalNames, outputSignalNames } from './signals';
import scales from './scales';
import axes from './axes';
import marks from './marks';

export { inputDataSetNames, inputSignalNames, outputSignalNames };
export default Object.assign({}, global, {
  data, signals, scales, axes, marks
});
