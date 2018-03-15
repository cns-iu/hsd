import {
  Collection, Seq,
  fromJS
} from 'immutable';
import {
  isArray, isFunction, isPlainObject, isUndefined,
  reduce
} from 'lodash';

import { BaseOperator } from './base-operator';


export type Path = Seq.Indexed<string | number>;
export type Schema = object | any[]; // TODO Add additional valid types
export type CloneFactory = (obj: any, key?: number | string, owner?: any, path?: Path) => any;


const validTypes = Seq.Indexed.of(isArray, isPlainObject);

function defaultCloneFactory(obj: any): any {
  if (isArray(obj)) {
    return new Array(obj.length);
  } else if (isPlainObject(obj)) {
    return {};
  } else {
    return undefined;
  }
}

function makeCloneFactory(factory?: CloneFactory): CloneFactory {
  if (!isFunction(factory)) {
    return defaultCloneFactory;
  }

  return (obj, key, owner, path) => {
    const clone = factory(obj, key, owner, path);
    return isUndefined(clone) ? defaultCloneFactory(obj) : clone;
  };
}


// TODO improve CombineOperator to handle nested schemas
// Remember to take care of multiple references to the same object
// Check out lodash deepClone for how they clone objects
// Optional: Call unwrap on operators to make a flatter structure
export class CombineOperator<In, Out> extends BaseOperator<In, Out> {
  private readonly parsedSchema: Collection<any, any>;

  constructor(
    readonly schema: object | any[],
    readonly factory?: CloneFactory
  ) {
    super();

    if (!validTypes.some((pred) => pred(schema))) {
      throw new Error('Invalid top level schema object type');
    }

    this.factory = makeCloneFactory(factory);
    this.parsedSchema = fromJS(schema);
  }

  get(data: In): Out {
    return reduce(this.schema, (result, value, key) => {
      if (value instanceof BaseOperator) {
        value = value.get(data);
      }

      result[key] = value;
      return result;
    }, this.factory(this.schema, undefined, undefined, Seq.Indexed()));
  }

  getState(): Collection<any, any> {
    return Seq.Indexed.of<any>(this.parsedSchema, this.factory);
  }
}
