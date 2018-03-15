
export interface DatumArgs {
  id: string;
  rawData: any;
}

export class Datum {
  readonly id: string;
  readonly rawData: any;

  constructor(args: DatumArgs) {
    ({id: this.id, rawData: this.rawData} = args);
  }
}
