import { Node, NodeArgs } from './node';


export interface SingleNodeArgs extends NodeArgs {
  expandable?: boolean;
}

export class SingleNode extends Node {
  readonly expandable: boolean;

  constructor(args: SingleNodeArgs) {
    super(args);
    ({expandable: this.expandable = false} = args);
  }

  // TODO
}
