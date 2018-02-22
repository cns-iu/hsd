import * as group from './group.json';
import * as symbolMarks from './symbol.json';

export default [Object.assign({}, group, {
  data: (group['data'] || []).concat(),
  marks: (group['marks'] || []).concat(
    symbolMarks
  )
})];
