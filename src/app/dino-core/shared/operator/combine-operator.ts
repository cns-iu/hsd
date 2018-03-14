import { Collection, List, Map, Record, fromJS } from 'immutable';
import {
  isArray, isFunction, isPlainObject, isUndefined,
  cloneDeepWith, identity
} from 'lodash';

import { BaseOperator } from './base-operator';


type Path = List<string | number>;

class CycleRef extends Record({path: List()}) {
  constructor(path: Path) {
    super({path});
  }
}


function acyclicClone(
  data: any,
  callback?: (value: any, key: number | string, obj: any, path: Path) => any
): any {
  const cycleMemo = Map<any, CycleRef>().asMutable();
  const pathMemo = Map<any, Path>().asMutable();
  callback = isFunction(callback) ? callback : identity;

  return cloneDeepWith(data, (value: any, key: number | string, obj: any) => {
    const path = pathMemo.get(value, List.of('')).push(key);

    if (isArray(value) || isPlainObject(value)) {
      if (cycleMemo.has(value)) {
        return cycleMemo.get(value);
      } else {
        cycleMemo.set(value, new CycleRef(path));
      }
    }

    pathMemo.set(value, path);
    return callback(value, key, obj, path);
  });
}


export class CombineOperator<In, Out> extends BaseOperator<In, Out> {
  private readonly operatorPaths: List<Path>;
  private readonly parsedSchema: Collection<any, any>;

  constructor(readonly schema: object | any[]) {
    super();

    if (!isArray(schema) && !isPlainObject(schema)) {
      throw new Error('CombineOperator\'s schema must be an array or a plain object');
    }

    const paths = List<Path>().asMutable();
    const clone = acyclicClone(schema, (value, _key, _obj, path) => {
      if (value instanceof BaseOperator) {
        paths.push(path);
        return value.unwrap();
      }
    });

    this.operatorPaths = paths.asImmutable();
    this.parsedSchema = fromJS({'': clone});
  }

  get(data: In): Out {
    return undefined; // TODO
  }

  getState(): Collection<any, any> {
    return this.parsedSchema;
  }
}
