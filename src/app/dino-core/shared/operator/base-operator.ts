import { Collection, is } from 'immutable';
import { uniqueId } from 'lodash';


export abstract class BaseOperator<In, Out> {
  readonly id: string = uniqueId('operator_');
  private cachedState: Collection<any, any> = undefined;

  // Abstract methods to override in subclasses
  abstract get(data: In): Out;
  abstract getState(): Collection<any, any>;

  // equals and hashCode for use in immutable.js
  equals(other: any): boolean {
    if (other instanceof BaseOperator) {
      return is(this.getCachedState(), other.getCachedState());
    }

    return false;
  }

  hashCode(): number {
    return this.getCachedState().hashCode();
  }

  // Utility
  unwrap(): BaseOperator<In, Out> {
    return this;
  }

  private getCachedState(): Collection<any, any> {
    return this.cachedState || (this.cachedState = this.getState());
  }
}
