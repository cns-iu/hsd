import { ConceptType, VisibilityType, NodeInfo, SummaryNode, SingleNode } from './node';

export function getNodeInfoColor(
  nodeInfo: NodeInfo,
  fieldName: string = 'concept',
  defaultColor: string = '#5B9BD5'
): string {
  let color = defaultColor;
  if (fieldName === 'concept') {
    switch (nodeInfo.concept) {
      case ConceptType.Case:
        color = '#5B9BD5';
        break;
      case ConceptType.Folder:
        color = '#70AD47';
        break;
      case ConceptType.Leaf:
        color = '#FFC000';
        break;
    }
  } else if (fieldName === 'visibility') {
    switch (nodeInfo.visibility) {
      case VisibilityType.Active:
        color = '#5B9BD5';
        break;
      case VisibilityType.Inactive:
        color = '#70AD47';
        break;
      case VisibilityType.Hidden:
        color = '#FFC000';
        break;
    }
  } else if (fieldName === 'isSynonym') {
    color = nodeInfo.isSynonym ? '#00FF00' : '#FF0000';
  } else if (fieldName === 'hasMetaData') {
    color = nodeInfo.hasMetaData ? '#00FF00' : '#FF0000';
  } else if (fieldName === 'tableName') {
    switch (nodeInfo.tableName) {
      case 'concept_dimension':
        color = '#5B9BD5';
        break;
      case 'patient_dimension':
        color = '#70AD47';
        break;
      case 'visit_dimension':
        color = '#FFC000';
        break;
      default:
        color = '#00ffff';
        break;
    }
  } else if (fieldName === 'fixedColor') {
      color = defaultColor;
  }
  return color;
}

// Returns color-encoding value to show on tooltip
export function getNodeColorText (
  nodeInfo: NodeInfo,
  fieldName: string = 'concept'
): string {
    switch (fieldName) {
      case 'concept': return ConceptType[nodeInfo.concept];
      case 'visibility': return VisibilityType[nodeInfo.visibility];
      case 'isSynonym': return nodeInfo.isSynonym.toString();
      case 'hasMetaData': return nodeInfo.hasMetaData.toString();
      case 'tableName': return nodeInfo.tableName;
      case 'fixedColor': return 'Fixed Color';
    }
}

export function getNodeInfoOpacity(
  nodeInfo: NodeInfo,
  fieldName: string = 'visibility',
  defaultOpacity: number = 0.5
): number {
  let opacity = defaultOpacity;
  if (fieldName === 'concept') {
    switch (nodeInfo.concept) {
      case ConceptType.Case:
        opacity = 1.0;
        break;
      case ConceptType.Folder:
        opacity = 0.6;
        break;
      case ConceptType.Leaf:
        opacity = 0.3;
        break;
    }
  } else if (fieldName === 'visibility') {
    switch (nodeInfo.visibility) {
      case VisibilityType.Active:
        opacity = 1.0;
        break;
      case VisibilityType.Inactive:
        opacity = 0.6;
        break;
      case VisibilityType.Hidden:
        opacity = 0.2;
        break;
    }
  } else if (fieldName === 'isSynonym') {
    opacity = nodeInfo.isSynonym ? 1.0 : 0.5;
  } else if (fieldName === 'hasMetaData') {
    opacity = nodeInfo.hasMetaData ? 1.0 : 0.5;
  } else if (fieldName === 'tableName') {
    switch (nodeInfo.tableName) {
      case 'concept_dimension':
        opacity = 1;
        break;
      case 'patient_dimension':
        opacity = .75;
        break;
      case 'visit_dimension':
        opacity = .5;
        break;
      default:
        opacity = .2;
        break;
    }
  } else if (fieldName === 'fullyOpaque') {
      opacity = 1;
  }

  return opacity;
}

// Returns opacity-encoding value to show on tooltip
export function getNodeOpacityText (
  nodeInfo: NodeInfo,
  fieldName: string = 'visibility'
): string {
  switch (fieldName) {
    case 'concept': return ConceptType[nodeInfo.concept];
    case 'visibility': return VisibilityType[nodeInfo.visibility];
    case 'isSynonym': return nodeInfo.isSynonym.toString();
    case 'hasMetaData': return nodeInfo.hasMetaData.toString();
    case 'tableName': return nodeInfo.tableName;
    case 'fullyOpaque': return 'Fully Opaque';
  }
}

export function getSingleNodeTooltip(
  node: SingleNode,
  summaryType = 'cumulative',
  fieldName = 'tooltip',
  defaultTooltip = 'Single Node'): string {
  switch (summaryType) {
    case 'cumulative': return node.path + ' ' + ConceptType[node.info.concept];
    case 'byLevel': return 'Level ' + node.level.toString();
  }

}

export function getSummaryNodeBreakdownTooltip(
  node: any,
  part: NodeInfo,
  summaryType = 'cumulative',
  fieldName = 'tooltip',
  defaultTooltip = 'Single Node'): string {
  return '# Concepts: ' + part.numPaths + ' / ' + node.totalNumPaths;
}
