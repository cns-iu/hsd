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

export interface NodeInfo {
  concept: ConceptType;
  visibility: VisibilityType;
  isSynonym: boolean;
  hasMetaData: boolean;
  numPaths: number;
}

export interface Node {
  level: number;
  path: string;
  label: string;
  info: NodeInfo;
}

export interface SummaryNode {
  level: number;
  path: string;
  breakdown: NodeInfo[];
}


// Normalization utility

export function normalizePath(path: string): string {
  // Turns the path into lower case and removes any trailing backslashes
  return (path.match(/(.+?)\\*$/) || [''])[1].toLowerCase();
}


// Convertion utility

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
