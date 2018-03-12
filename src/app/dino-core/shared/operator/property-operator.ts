import { get } from 'lodash';

import { Operator } from './operator';


export class PropertyOperator<Out> extends Operator<any, Out> {
  constructor(readonly path: string | string[], readonly defaultValue?: any) {
    super();
  }

  get(data: any): Out {
    return get(data, this.path, this.defaultValue);
  }
}
