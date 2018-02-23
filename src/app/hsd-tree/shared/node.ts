export enum ConceptType {
  Case,
  Folder,
  Leaf
}

export enum VisibilityType {
  Active,
  Inactive,
  Hidden
}

export type Node = SingleNode | SummaryNode;

export interface NodeInfo {
  concept: ConceptType;
  visibility: VisibilityType;
  isSynonym: boolean;
  hasMetaData: boolean;
  numPaths: number;
  tableName: string;
}

export interface SingleNode {
  type: 'SingleNode';
  level: number;
  path: string;
  label: string;
  info: NodeInfo;
}

export interface SummaryNode {
  type: 'SummaryNode';
  level: number;
  path: string;
  breakdown: NodeInfo[];
  next?: SummaryNode;
}


// Normalization utility

export function normalizePath(path: string): string {
  // Turns the path into lower case and removes any trailing backslashes
  const match = path.toLowerCase().match(/(.+?)\\*$/);
  return match ? match[1] : '';
}


// Conversion utility

const stringToConceptMap = {
  'case': ConceptType.Case,
  'folder': ConceptType.Folder,
  'leaf': ConceptType.Leaf
};

export function stringToConcept(conceptString: string): ConceptType {
  return stringToConceptMap[conceptString.toLowerCase()];
}


const stringToVisibilityMap = {
  'active': VisibilityType.Active,
  'inactive': VisibilityType.Inactive,
  'hidden': VisibilityType.Hidden
};

export function stringToVisibility(visibilityString: string): VisibilityType {
  return stringToVisibilityMap[visibilityString.toLowerCase()];
}


export function stringToIsSynonym(isSynonymString: string): boolean {
  return isSynonymString.toLowerCase() === 'y';
}

export function stringToHasMetaData(hasMetaDataString: string): boolean {
  return hasMetaDataString.toLowerCase() === 'y';
}


// Node tree utility

export function parentPathFor(node: SingleNode | string): string {
  // Removes the last \[segment]
  const path = typeof node === 'string' ? node : node.path;
  const match = path.match(/(.*?)\\[^\\]+$/);
  return match ? match[1] : '';
}

export function isParentOf(parent: Node, node: Node): boolean {
  if (node.path === parent.path && node.level === (parent.level + 1)) {
    return true; // SingleNode/SummaryNode + SummaryNode
  } else if (parentPathFor(node.path) === parent.path) {
    return true; // SingleNode + SingleNode
  } else {
    return false;
  }
}

export function isAncestorOf(ancestor: Node, node: Node): boolean {
  if (node.path === ancestor.path && node.level > ancestor.level) {
    return true; // SingleNode/SummaryNode + SummaryNode
  } else if (node.path.startsWith(ancestor.path) && node.path !== ancestor.path) {
    return true; // SingleNode + SingleNode/SummaryNode
  } else {
    return false;
  }
}

export function filterLeafs(nodes: SingleNode[]): SingleNode[] {
  const leafMap: { [path: string]: boolean } = nodes.reduce((map, node) => {
    map[parentPathFor(node)] = false;
    if (!(node.path in map)) {
      map[node.path] = true;
    }

    return map;
  }, {});

  return nodes.filter((node) => {
    return leafMap[node.path];
  });
}
