import * as global from './global.json';
import data, { inputDataSetNames } from './data';
import signals, { outputSignalNames } from './signals';

export { inputDataSetNames, outputSignalNames };
export default Object.assign({}, global, {
  data, signals
});
