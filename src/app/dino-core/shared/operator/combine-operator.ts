import { Collection } from 'immutable';

import { Operator } from './operator';


export class CombineOperator<In, Out> extends Operator<In, Out> {
  // TODO

  get(data: In): Out {
    return undefined; // TODO
  }

  getState(): Collection<any, any> {
    return undefined; // TODO
  }
}
