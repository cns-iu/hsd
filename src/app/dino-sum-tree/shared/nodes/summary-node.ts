import { Node, NodeArgs } from './node';


export interface SummaryNodeArgs extends NodeArgs {
  partitions: any; // TODO fix type
}

export class SummaryNode extends Node {
  readonly partitions: SummaryNode.Partition;

  constructor(args: SummaryNodeArgs) {
    super(args);

    // TODO set partitions
  }

  // TODO
}

export namespace SummaryNode {
  export class Partition {
    // TODO
  }
}
