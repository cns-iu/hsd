import { Collection, List, Seq } from 'immutable';

import { Operator } from './operator';


export class ChainOperator<In, Out> extends Operator<In, Out> {
  readonly operators: List<Operator<any, any>>;

  constructor(...operators: Operator<any, any>[]) {
    super();

    if (operators.length < 2) {
      throw new Error('ChainOperator requires at least two arguments');
    }

    this.operators = List(Seq.Indexed(operators).flatMap((op) => {
      return op instanceof ChainOperator ? op.operators : [op];
    }));
  }

  get(data: In): Out {
    const first = this.operators.first() as Operator<In, any>;
    const last = this.operators.last() as Operator<any, Out>;

    const intermediate = this.operators.slice(1, -1).reduce((value, op) => {
      return op.get(value);
    }, first.get(data));
    return last.get(intermediate);
  }

  protected getState(): Collection<any, any> {
    return this.operators;
  }
}
