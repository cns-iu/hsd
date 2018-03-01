import {
  isFunction,

  defaults as setDefaults, get as getNestedProperty,
  uniqueId
} from 'lodash';

import { Field, DataType, DataKind } from './field';


export type Accessor<R> = (item: any) => R | undefined;
export type Transform<T, R> = (value: T) => R | undefined;

export interface FieldArgs {
  id?: string;
  dataType?: DataType;
  dataKind?: DataType;
}


export abstract class FieldBase<T> implements Field<T> {
  public readonly id;
  public readonly dataType;
  public readonly dataKind;

  constructor(...args: FieldArgs[]) {
    setDefaults(this, ...args, {
      id: uniqueId('field_id_')
      // TODO default values
    });
  }

  abstract extractValue(item);
}

export class AccessorField<T> extends FieldBase<T> {
  public readonly accessor: Accessor<T>;

  constructor(accessor: string | Accessor<T>, args?: FieldArgs) {
    super(args || {}, isFunction(accessor) ? {} : {id: accessor});

    if (!isFunction(accessor)) {
      const path = accessor;
      accessor = (item) => getNestedProperty(item, path);
    }

    this.accessor = accessor as Accessor<T>;
  }

  extractValue(item) {
    return item !== undefined ? this.accessor(item) : undefined;
  }
}

export class TransformField<T, R> extends FieldBase<R> {
  constructor(
    public readonly source: Field<T>,
    public readonly transform: Transform<T, R>,
    args?: FieldArgs
  ) {
    super(args || {});
  }

  extractValue(item) {
    const value = this.source.extractValue(item);
    return value !== undefined ? this.transform(value) : undefined;
  }
}
