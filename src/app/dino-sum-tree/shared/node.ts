

export interface NodeInfo {
  id: string;
  expandable?: boolean;

  rawData: any;
}

export interface SummaryInfo {
  id: string;
  partitions: SummaryPartition[];

  rawData: any;
}

export interface SummaryPartition {
  percentage: number;
}
