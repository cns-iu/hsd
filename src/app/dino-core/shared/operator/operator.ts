import { Collection, Seq, is } from 'immutable';

import { sum as arraySum } from 'lodash';

import { BaseOperator } from './base-operator';
import { AccessorOperator, Path } from './accessor-operator';
import { ChainOperator } from './chain-operator';
import { CombineOperator } from './combine-operator';
import { IdentityOperator } from './identity-operator';
import { MapOperator } from './map-operator';


interface OperatorConstructor<In, Out> {
  new (...args: any[]): BaseOperator<In, Out>;
}

function create<In, Out>(
  type: OperatorConstructor<In, Out>, ...args: any[]
): Operator<In, Out> {
  return new Operator(new type(...args));
}


export class Operator<In, Out> extends BaseOperator<In, Out> {
  constructor(private readonly wrapped: BaseOperator<In, Out>) {
    super();
  }

  // Creation methods
  static access<In = any, Out = any>(
    path: Path, defaultValue?: Out
  ): Operator<In, Out> {
    return create(AccessorOperator, path, defaultValue);
  }

  static identity<T = any>(): Operator<T, T> {
    return create(IdentityOperator);
  }

  static sum<In = any>(
    ...operators: Operator<In, number>[]
  ): Operator<In, number> {
    return Operator.identity().combine(operators).map(arraySum);
  }

  // Override base class methods
  get(data: In): Out {
    return this.wrapped.get(data);
  }

  getState(): Collection<any, any> {
    return this.wrapped.getState();
  }

  unwrap(): BaseOperator<In, Out> {
    return this.wrapped;
  }

  // Convenience methods
  add(num: number): Operator<In, number> {
    return this.map((value: any) => value + num);
  }

  chain<NewOut>(operator: Operator<Out, NewOut>): Operator<In, NewOut>;
  chain<NewOut = any>(first: Operator<Out, any>, ...operators: Operator<any, any>[]): Operator<In, NewOut>;
  chain<NewOut>(...operators: Operator<any, any>[]): Operator<In, NewOut> {
    return create(ChainOperator, this, ...operators);
  }

  combine<NewOut>(schema: object | any[]): Operator<In, NewOut> {
    return this.chain(create(CombineOperator, schema));
  }

  map<NewOut>(mapper: (data: Out) => NewOut): Operator<In, NewOut> {
    return this.chain(create(MapOperator, mapper));
  }
}
