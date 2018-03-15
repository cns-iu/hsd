import { Collection, Seq } from 'immutable';

import { BaseOperator } from './base-operator';


const uniqueObject = {};

export class IdentityOperator<T> extends BaseOperator<T, T> {
  get(data: T): T {
    return data;
  }

  getState(): Collection<any, any> {
    return Seq.Indexed.of(uniqueObject);
  }
}