export type DataType = any;
export type DataKind = any;

export interface Field<T> {
  id: string;
  dataType: DataType;
  dataKind: DataKind;

  extractValue(item: any): T | undefined;
}
