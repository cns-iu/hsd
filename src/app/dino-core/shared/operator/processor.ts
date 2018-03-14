import { Map, Set } from 'immutable';
import { isFunction, pick } from 'lodash';

import { Operator } from './operator';


export type MapArgument<Record> = any; // FIXME

export class Processor<Record, IRecord = any> {
  readonly copiedProperties: Set<keyof Record & keyof IRecord>;
  readonly extractedProperties: Map<keyof Record, Operator<IRecord, Record[keyof Record]>>;
  readonly computedProperties: Map<keyof Record, Operator<Partial<Record>, Record[keyof Record]>>;

  constructor(
    copied: Iterable<keyof Record & keyof IRecord>,
    extracted: MapArgument<Record>,
    computed: MapArgument<Record>
  ) {
    this.copiedProperties = Set(copied);
    this.extractedProperties = Map(extracted);
    this.computedProperties = Map(computed);
  }

  process(data: IRecord, factory?: (data: IRecord) => Record): Record {
    const result = isFunction(factory) ? factory(data) : {} as Record;
    Object.assign(result, pick(data, this.copiedProperties.toArray()));

    this.extractedProperties.forEach((op, prop) => {
      result[prop] = op.get(data);
    });
    this.computedProperties.forEach((op, prop) => {
      result[prop] = op.get(result);
    });

    return result;
  }

  // TODO add/update/remove methods (should return new processors)
}
