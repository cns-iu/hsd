import { Operator } from './operator';


export class MapOperator<In, Out, Intermediate = any> extends Operator<In, Out> {
  constructor(
    readonly operator: Operator<In, Intermediate>,
    readonly mapper: (data: Intermediate) => Out
  ) {
    super();
  }

  get(data: In): Out {
    const intermediateData = this.operator.get(data);
    return this.mapper(intermediateData);
  }
}
