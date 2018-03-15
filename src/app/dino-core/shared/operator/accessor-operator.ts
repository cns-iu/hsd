import { Collection, List } from 'immutable';
import { get, toPath } from 'lodash';

import { BaseOperator } from './base-operator';


export type Path = number | string | (number | string)[];

export class AccessorOperator<Out> extends BaseOperator<any, Out> {
  constructor(readonly path: Path, readonly defaultValue?: Out) {
    super();
  }

  get(data: any): Out {
    return get(data, this.path, this.defaultValue);
  }

  getState(): Collection<any, any> {
    return List.of<any>(List(toPath(this.path)), this.defaultValue);
  }
}
