import { Collection } from 'immutable';

import { Node } from './node';


export function getLeafs(
  nodes: Collection.Indexed<Node>
): Collection.Indexed<Node> {
  const parents = nodes.map((node) => node.parent).toSet();
  return nodes.filter((node) => !parents.has(node)).toList();
}
