import {
  Component, OnInit, OnChanges, OnDestroy,
  Input, ViewChild,
  ElementRef, SimpleChanges
} from '@angular/core';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/empty';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/reduce';
import 'rxjs/add/operator/toArray';

import { bind as Bind } from 'bind-decorator';

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
      '\\pcori\\demographic',
      '\\pcori\\diagnosis',
      '\\pcori\\encounter',
      '\\pcori\\enrollment',
      '\\pcori\\lab_result_cm',
      '\\pcori\\medication',
      '\\pcori\\procedure',
        '\\pcori\\procedure\\09',
        '\\pcori\\procedure\\10',
        '\\pcori\\procedure\\11',
        '\\pcori\\procedure\\ch',
        '\\pcori\\procedure\\lc',
        '\\pcori\\procedure\\nd',
        '\\pcori\\procedure\\re',
        '\\pcori\\procedure\\version',
      '\\pcori\\vital'
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

    const signalsInitialized = this.setSignalValues(instance);
    const signalsAttached = this.attachSignalListeners(instance);
    const dataInitialized = this.setDataTuples(instance);

    const initialized = Observable.merge(
      signalsInitialized, signalsAttached,
      dataInitialized
    );

    // Run visualization
    initialized.subscribe(undefined, undefined, () => instance.run());

    // Temporary - Debugging
    console.log(instance);
  }

  private destroyVegaInstance(): void {
    if (this.vegaInstance) {
      this.vegaInstance.finalize();
    }
  }

  private setSignalValues(instance: any): Observable<any> {
    const {
      maxLevelName,
      yMultiplierName, yOffsetName,
      summaryBoxSizeName
    } = inputSignalNames;

    // Required
    instance.signal(maxLevelName, 11); // TODO fix value

    // Optional
    instance.signal(yMultiplierName, 30);
    // instance.signal(yOffsetName, 30);

    // instance.signal(summaryBoxSizeName, {
    //   width: 15,
    //   height: 20
    // });

    return Observable.empty();
  }

  private attachSignalListeners(instance: any): Observable<any> {
    const {
      nodeClickName, summaryClickName,
      summaryTypeName, colorName, opacityName
    } = outputSignalNames;

    instance.addSignalListener(nodeClickName, this.onNodeClick);
    instance.addSignalListener(summaryClickName, this.onSummaryClick);

    instance.addSignalListener(summaryTypeName, this.onSummaryTypeChange);
    instance.addSignalListener(colorName, this.onColorFieldChange);
    instance.addSignalListener(opacityName, this.onOpacityFieldChange);

    return Observable.empty();
  }

  private setDataTuples(instance: any): Observable<any> {
    const { summariesName } = inputDataSetNames;

    const singleNodes = this.setSingleNodeTuples(instance, this.initialNodePaths);
    const leafPaths = singleNodes.map(filterLeafs)
      .map((nodes) => nodes.map((node) => node.path));
    const summaryNodes = leafPaths.mergeMap((paths) => {
      return this.setSummaryNodeTuples(instance, paths);
    });

    return summaryNodes;
  }

  private setSingleNodeTuples(instance: any, paths: string[]): Observable<SingleNode[]> {
    const dataset = inputDataSetNames.nodesName;
    const nodes = this.service.queryNodes(paths)
      .reduce((acc, nodeGroup) => acc.concat(nodeGroup), [])
      .do((allNodes) => {
        // TODO calculate color + opacity fields
        instance.insert(dataset, allNodes);
      });

    return nodes;
  }

  private setSummaryNodeTuples(instance: any, paths: string[]): Observable<SummaryNode[]> {
    const dataset = inputDataSetNames.summariesName;
    const nodes = this.service.querySummaryNodes(paths)
      .reduce((acc, nodeGroup) => acc.concat(nodeGroup), [])
      .do((allNodes) => {
        allNodes.forEach((node: any) => {
          node.count = node.breakdown.reduce((acc, b) => acc + b.numPaths, 0);
        });
        // TODO calculate multiplier + cumPercentage + count
        instance.insert(dataset, allNodes);
      });

    return nodes;
  }

  // Events
  @Bind
  private onNodeClick(name: string, node: SingleNode): void {
    // TODO
    // Outline
    // Determine if node is collapsed or expanded by searching for children
    // with isParentOf
    // If expanded
    //  Remove direct and indirect children with isAncestorOf
    //  Remove summaries for direct and indirect children with isAncestorOf
    //  Add summary for this node
    // Else
    //  Remove summaries for this node with isAncestorOf
    //  Add direct children
    //  Add summaries for direct children
  }

  @Bind
  private onSummaryClick(name: string, node: SummaryNode): void {
    // TODO
    // Outline
    // Remove this node and direct and indirect children with isAncestorOf
    // Add SingleNodes for this node's parent
    // Add summaries for the inserted nodes
  }

  @Bind
  private onSummaryTypeChange(name: string, type: string): void {
    // TODO
  }

  @Bind
  private onColorFieldChange(name: string, value: string): void {
    // TODO
  }

  @Bind
  private onOpacityFieldChange(name: string, value: string): void {
    // TODO
  }
}
