import { Collection, List, Seq } from 'immutable';

import { BaseOperator } from './base-operator';

export class ChainOperator<In, Out> extends BaseOperator<In, Out> {
  readonly operators: List<BaseOperator<any, any>>;

  constructor(...operators: BaseOperator<any, any>[]) {
    super();

    if (operators.length < 2) {
      throw new Error('ChainOperator requires at least two arguments');
    }

    this.operators = List(Seq.Indexed(operators).flatMap((op) => {
      op = op.unwrap();
      return op instanceof ChainOperator ? op.operators : [op];
    }));
  }

  get(data: In): Out {
    const first = this.operators.first() as BaseOperator<In, any>;
    const last = this.operators.last() as BaseOperator<any, Out>;

    const intermediate = this.operators.slice(1, -1).reduce((value, op) => {
      return op.get(value);
    }, first.get(data));
    return last.get(intermediate);
  }

  getState(): Collection<any, any> {
    return this.operators;
  }
}
