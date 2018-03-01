import {
  castArray, forOwn
} from 'lodash';

import { Field } from './field';


export type FieldMappingType<R> = {[P in keyof R]?: Field<R[P]>};

export class FieldProcessor<R> {
  constructor(
    public readonly extractedFields: FieldMappingType<R>,
    public readonly computedFields: FieldMappingType<R> = {}
  ) {}

  setField<P extends keyof R>(
    prop: P, field: Field<R[P]>, type?: 'extracted' | 'computed'
  ): this {
    const hasExtracted = prop in this.extractedFields;
    const hasComputed = prop in this.computedFields;
    const isExtracted = type === 'extracted' || (
      type === undefined && (hasExtracted || !hasComputed)
    );

    const mapping = isExtracted ? this.extractedFields : this.computedFields;
    mapping[prop] = field;

    return this;
  }

  process(item: any, record: Partial<R> = {}): R {
    forOwn(this.extractedFields, ([prop, field]) => {
      record[prop] = field.extractValue(item);
    });
    forOwn(this.computedFields, ([prop, field]) => {
      record[prop] = field.extractValue(record);
    });

    return record as R;
  }

  update(item: any, record: R, props: keyof R | (keyof R)[]): R {
    (castArray(props) as (keyof R)[]).forEach((prop) => {
      if (prop in this.extractedFields) {
        record[prop] = this.extractedFields[prop].extractValue(item);
      } else if (prop in this.computedFields) {
        record[prop] = this.computedFields[prop].extractValue(record);
      }
    });

    return record;
  }
}
