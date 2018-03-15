import { Collection, List } from 'immutable';

import { BaseOperator } from './base-operator';


export class MapOperator<In, Out> extends BaseOperator<In, Out> {
  constructor(readonly mapper: (data: In) => Out) {
    super();
  }

  get(data: In): Out {
    return this.mapper(data);
  }

  getState(): Collection<any, any> {
    return List.of(this.mapper);
  }
}
