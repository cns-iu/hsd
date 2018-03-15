import {  } from 'immutable';
import { isString } from 'lodash';

import { Datum, DatumArgs } from '../../../dino-core';


export interface NodeArgs extends DatumArgs {
  parent: Node | null;
}


// Utility
function getId(node: Node | string): string {
  return isString(node) ? node : node.id;
}


export class Node extends Datum {
  readonly parent: Node | null;

  constructor(args: NodeArgs) {
    super(args);
    ({parent: this.parent} = args);
  }

  isChildOf(parent: Node | string): boolean {
    return this.parent && this.parent.id === getId(parent);
  }

  isDescendantOf(ancestor: Node | string): boolean {
    const id = getId(ancestor);
    let current = this.parent;
    while (current !== null) {
      if (current.id === id) {
        return true;
      }

      current = current.parent;
    }

    return false;
  }

  // TODO
}
