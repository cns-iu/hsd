import { Collection, Seq } from 'immutable';
import { Operator } from './operator';


export class MapOperator<In, Out> extends Operator<In, Out> {
  constructor(readonly mapper: (data: In) => Out) {
    super();
  }

  get(data: In): Out {
    return this.mapper(data);
  }

  protected getState(): Collection<any, any> {
    return Seq.Indexed.of(this.mapper);
  }
}
