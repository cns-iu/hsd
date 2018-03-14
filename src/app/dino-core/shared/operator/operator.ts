import { Collection, Seq, is } from 'immutable';
import { uniqueId } from 'lodash';

import { AccessorOperator } from './accessor-operator';
import { ChainOperator } from './chain-operator';
import { MapOperator } from './map-operator';


export abstract class Operator<In, Out> {
  readonly id: string = uniqueId('operator_');

  // Creation methods
  static access<In_ = any, Out_ = any>(
    path: string | string[], defaultValue?: any
  ): Operator<In_, Out_> {
    return new AccessorOperator(path, defaultValue);
  }

  // Abstract methods to override in subclasses
  abstract get(data: In): Out;
  protected abstract getState(): Collection<any, any>;

  // equals and hashCode for use in immutable.js
  equals(other: any): boolean {
    if (other instanceof Operator) {
      return is(this.getState(), other.getState());
    }

    return false;
  }

  hashCode(): number {
    return this.getState().hashCode();
  }

  // Convenience methods
  chain<NewOut>(operator: Operator<Out, NewOut>): Operator<In, NewOut> {
    return new ChainOperator(this, operator);
  }

  map<NewOut>(mapper: (data: Out) => NewOut): Operator<In, NewOut> {
    return this.chain(new MapOperator(mapper));
  }
}
