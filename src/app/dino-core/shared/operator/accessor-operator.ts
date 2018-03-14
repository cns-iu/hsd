import { Collection, Seq } from 'immutable';
import { get, toPath } from 'lodash';

import { Operator } from './operator';


export class AccessorOperator<Out> extends Operator<any, Out> {
  constructor(readonly path: string | string[], readonly defaultValue?: any) {
    super();
  }

  get(data: any): Out {
    return get(data, this.path, this.defaultValue);
  }

  protected getState(): Collection<any, any> {
    return Seq.Indexed.of(Seq.Indexed(toPath(this.path)), this.defaultValue);
  }
}
