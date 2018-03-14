import { Collection, is } from 'immutable';
import { uniqueId } from 'lodash';

export abstract class BaseOperator<In, Out> {
  readonly id: string = uniqueId('operator_');

  // Abstract methods to override in subclasses
  abstract get(data: In): Out;
  abstract getState(): Collection<any, any>;

  // equals and hashCode for use in immutable.js
  equals(other: any): boolean {
    if (other instanceof BaseOperator) {
      return is(this.getState(), other.getState());
    }

    return false;
  }

  hashCode(): number {
    return this.getState().hashCode();
  }

  // Utility
  unwrap(): BaseOperator<In, Out> {
    return this;
  }
}
