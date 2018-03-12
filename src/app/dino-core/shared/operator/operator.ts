import { uniqueId } from 'lodash';

import { ChainOperator } from './chain-operator';
import { MapOperator } from './map-operator';


export abstract class Operator<In, Out> {
  readonly id: string;

  constructor() {
    this.id = uniqueId('operator_');
  }

  abstract get(data: In): Out;

  // TODO implement equals and hashCode for use in immutable containers
  // Override where appropriate in subclasses

  // Convenience methods
  chain<NewOut>(operator: Operator<Out, NewOut>): Operator<In, NewOut> {
    return new ChainOperator(this, operator);
  }

  map<NewOut>(mapper: (data: Out) => NewOut): Operator<In, NewOut> {
    return new MapOperator(this, mapper);
  }
}
