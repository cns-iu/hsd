import {
  Component, OnInit, OnChanges, OnDestroy,
  Input, ViewChild,
  ElementRef, SimpleChanges
} from '@angular/core';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/toArray';

import { vega, defaultLogLevel } from '../../vega';
import { SumTreeDataService } from '../shared/sum-tree-data.service';
import {
  Node, SingleNode, SummaryNode,
  filterLeafs
} from '../shared/node';
import vegaSpec, {
  inputDataSetNames,
  inputSignalNames, outputSignalNames
} from './vega-spec';

@Component({
  selector: 'hsd-sum-tree-rewrite',
  templateUrl: './sum-tree-rewrite.component.html',
  styleUrls: ['./sum-tree-rewrite.component.sass']
})
export class SumTreeRewriteComponent implements OnInit, OnChanges, OnDestroy {
  private vegaInstance: any;

  @ViewChild('vegaVis') visElement: ElementRef;
  @ViewChild('vegaInput') inputElement: ElementRef;

  @Input() vegaLogLevel = defaultLogLevel;
  @Input() initialNodePaths = [
    '\\pcori',
      '\\pcori\\procedure',
        '\\pcori\\procedure\\09',
        '\\pcori\\procedure\\10',
        '\\pcori\\procedure\\11',
        '\\pcori\\procedure\\ch',
        '\\pcori\\procedure\\lc',
        '\\pcori\\procedure\\nd',
        '\\pcori\\procedure\\re',
        '\\pcori\\procedure\\version'
  ];

  constructor(private service: SumTreeDataService) { }

  ngOnInit() {
    this.createVegaInstance();
  }

  ngOnChanges(changes: SimpleChanges) {
    // TODO
  }

  ngOnDestroy() {
    this.destroyVegaInstance();
  }

  // Vega setup
  private createVegaInstance(): void {
    const parsedSpec = vega.parse(vegaSpec);
    const instance = this.vegaInstance = new vega.View(parsedSpec)
      .renderer('svg') // In the future this might be replaced by a custom renderer
      .initialize(this.visElement.nativeElement, this.inputElement.nativeElement)
      .logLevel(this.vegaLogLevel)
      .hover(); // Enable default handling of hover

    this.attachSignalListeners(instance);

    // Set signal data
    instance.signal(inputSignalNames.maxLevelName, 11); // TODO fix value

    // Load single nodes
    const singleNodes = this.loadSingleNodes(this.initialNodePaths);

    // Process single nodes
    const leafs = singleNodes.do((nodes) => {
      instance.insert(inputDataSetNames.nodesName, nodes);
    }).map(filterLeafs).map((leafNodes) => leafNodes.map((node) => node.path));

    // Load summary nodes
    const summaryNodes: Observable<SummaryNode[]> = leafs.mergeMap(this.loadSummaryNodes.bind(this));

    // Process summary nodes
    const results = summaryNodes.do((nodes) => {
      instance.insert(inputDataSetNames.summariesName, nodes);
    }).toArray();

    // Run visualization
    results.subscribe(() => instance.run());

    // Temporary - Debugging
    console.log(instance);
  }

  private destroyVegaInstance(): void {
    if (this.vegaInstance) {
      this.vegaInstance.finalize();
    }
  }

  private attachSignalListeners(instance: any): void {
    const {
      nodeClickName, summaryClickName,
      summaryTypeName, colorName, opacityName
    } = outputSignalNames;

    instance.addSignalListener(nodeClickName, this.onNodeClick.bind(this));
    instance.addSignalListener(summaryClickName, this.onSummaryClick.bind(this));

    instance.addSignalListener(summaryTypeName, this.onSummaryTypeChange.bind(this));
    instance.addSignalListener(colorName, this.onColorFieldChange.bind(this));
    instance.addSignalListener(opacityName, this.onOpacityFieldChange.bind(this));
  }

  // Data loading helpers
  private loadSingleNodes(paths: string[]): Observable<SingleNode[]> {
    const boundQueryNode = this.service.queryNode.bind(this.service);
    const nodeObservables: Observable<SingleNode>[] = paths.map(boundQueryNode);

    // toArray ensures all nodes are returned at once since
    // it would be bad to insert/process a partial tree.
    return Observable.merge(...nodeObservables).toArray();
  }

  private loadSummaryNodes(paths: string[]): Observable<SummaryNode[]> {
    const boundQuerySummaryNodes = this.service.querySummaryNodes.bind(this.service);
    const nodeObservables: Observable<SummaryNode>[] = paths.map(boundQuerySummaryNodes);

    // Like loadSingleNodes it would be bad to return partial results, but
    // it is fine to return the results for each path independently.
    return Observable.merge(...nodeObservables.map((nodes) => nodes.toArray()));
  }

  // Events
  private onNodeClick(name: string, value: any): void {
    // TODO
  }

  private onSummaryClick(name: string, value: any): void {
    // TODO
  }

  private onSummaryTypeChange(name: string, value: string): void {
    // TODO
  }

  private onColorFieldChange(name: string, value: string): void {
    // TODO
  }

  private onOpacityFieldChange(name: string, value: string): void {
    // TODO
  }
}
