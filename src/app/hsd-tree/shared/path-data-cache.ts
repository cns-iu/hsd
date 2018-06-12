import { bind as Bind } from 'bind-decorator';

import { SingleNode, normalizePath, SummaryNode } from './node';
import { EndpointData } from './endpoint-data';

export class PathData {
  constructor (
    public singleNode?: SingleNode,
    public summaryNodes?: SummaryNode[],
    public childPaths?: string[]
  ) {}
}

export class PathDataCache {
  private cache: Map<string, PathData> = new Map();

  @Bind
  hasPathData(path: string): boolean {
    path = normalizePath(path);
    return this.cache.has(path);
  }

  @Bind
  isSingleNodeDataLoaded(path: string): boolean {
    return this.hasPathData(path) && !!this.getPathData(path).singleNode;
  }

  @Bind
  isChildrenDataLoaded(path: string): boolean {
    return this.hasPathData(path) && !!this.getPathData(path).childPaths;
  }

  @Bind
  isSummaryNodeDataLoaded(path: string): boolean {
    return this.hasPathData(path) && !!this.getPathData(path).summaryNodes;
  }

  @Bind
  getPathData(path: string): PathData {
    path = normalizePath(path);
    if (!this.hasPathData(path)) {
      this.cache.set(path, new PathData());
    }
    return this.cache.get(path);
  }

  addChildData(path: string, endpointData: EndpointData) {
    const parentData = this.getPathData(path);
    if (!parentData.childPaths) {
      parentData.childPaths = endpointData.singleNodes.map((node) => node.path);
    }

    endpointData.singleNodes.forEach((node) => {
      const data = this.getPathData(node.path);
      if (!data.singleNode) {
        data.singleNode = node;
      }
    });

    endpointData.summaryNodes.filter((node) => !this.isSummaryNodeDataLoaded(node.path)).forEach((node) => {
      const data = this.getPathData(node.path);
      if (!data.summaryNodes) {
        data.summaryNodes = [];
      }
      if (!data.summaryNodes.some((snode) => snode.path !== node.path)) {
        data.summaryNodes.push(node);
      }
    });
  }
}
