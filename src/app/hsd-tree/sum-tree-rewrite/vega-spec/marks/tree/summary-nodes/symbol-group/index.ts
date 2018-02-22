import * as group from './group.json';
import * as breakdownDataSet from './breakdown.json';
import * as symbolMarks from './symbol.json';

export default [Object.assign({}, group, {
  data: (group['data'] || []).concat(
    breakdownDataSet
  ),
  marks: (group['marks'] || []).concat(
    symbolMarks
  )
})];
