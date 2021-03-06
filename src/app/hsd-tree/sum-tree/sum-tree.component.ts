import {
  Component, OnInit, OnChanges, OnDestroy, DoCheck,
  Input, ViewChild,
  ElementRef, SimpleChanges
} from '@angular/core';

import { vega as vegaTooltip } from 'vega-tooltip';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/empty';
import 'rxjs/add/observable/merge';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/reduce';
import 'rxjs/add/operator/toArray';

import { bind as Bind } from 'bind-decorator';

import { vega, defaultLogLevel } from '../../vega';

import {
  Node, SingleNode, SummaryNode,
  isParentOf, isAncestorOf,
  filterLeafs, ConceptType
} from '../shared/node';
import {
  InternalNode, InternalSingleNode, InternalSummaryNode,
  convertToInternalSingleNode, convertToInternalSummaryNode,
  calculateMultiplier
} from './internal-nodes';
import vegaSpec, {
  inputDataSetNames,
  inputSignalNames, outputSignalNames
} from './vega-spec';

import { SumTreeDataService } from '../shared/sum-tree-data.service';


@Component({
  selector: 'app-sum-tree',
  templateUrl: './sum-tree.component.html',
  styleUrls: ['./sum-tree.component.sass']
})
export class SumTreeComponent implements OnInit, OnChanges, OnDestroy, DoCheck {
  private vegaInstance: any;
  private numPathsRef = { max: -1 };

  @ViewChild('vegaVis') visElement: ElementRef;

  @Input() isCompact = false;
  @Input() autoresize = false;
  @Input() width: number;
  @Input() height: number;

  @Input() maxLevel = 11;

  @Input() summaryType = 'byLevel';
  @Input() colorField = 'concept';
  @Input() opacityField = 'visibility';

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
  @ViewChild('vegaVis') sumTreeElement: ElementRef;

  private elementWidth = 0;
  private elementHeight = 0;

  private margin = { top: 0, bottom: 0, left: 0, right: 90 }; // TODO - TBD

  constructor(private service: SumTreeDataService) { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    if ('vegaLogLevel' in changes && this.vegaInstance) {
      this.vegaInstance.logLevel(changes['vegaLogLevel'].currentValue);
    }

    if (('colorField' in changes || 'opacityField' in changes || 'summaryType' in changes) && this.vegaInstance) {
      this.onEncodingChange();
    }

    if ((!this.autoresize) && (('width' in changes) && ('height' in changes))) {
      this.resize(this.width, this.height);
    }
  }

  ngDoCheck() {
    if (this.autoresize && this.sumTreeElement) {
      const width = this.sumTreeElement.nativeElement.clientWidth;
      const height = window.innerHeight - 120; // FIXME - hack

      this.resize(width, height);
    }
  }

  ngOnDestroy() {
    this.destroyVegaInstance();
  }

  private resize(width: number, height: number): void {
    if (width !== this.elementWidth || height !== this.elementHeight) {
      this.elementWidth = width;
      this.elementHeight = height;

      this.destroyVegaInstance();
      this.createVegaInstance();
  }
}

  // Vega setup
  private createVegaInstance(): void {
    const parsedSpec = vega.parse(vegaSpec);
    const instance = this.vegaInstance = new vega.View(parsedSpec)
      .renderer('svg') // In the future this might be replaced by a custom renderer
      .initialize(this.visElement.nativeElement)
      .width(this.elementWidth - this.margin.right)
      .height(this.elementHeight)
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
    initialized.subscribe(undefined, undefined, () => {
      instance.run();

      vegaTooltip(instance, {
        showAllFields: false,
        fields: [
          { field: 'Color' },
          { field: 'Opacity' },
          { field: 'Concepts', formatType: 'number' }
        ]
      });
    });

    // Debugging
    if (this.vegaLogLevel >= 2) {
      console.log(instance);
    }
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
    instance.signal(maxLevelName, this.maxLevel);

    // instance.signal(yOffsetName, 30);
    instance.signal(yMultiplierName, 30);
    instance.signal(summaryBoxSizeName, {
      width: 20,
      height: 40
    });

    return Observable.empty();
  }

  private attachSignalListeners(instance: any): Observable<any> {
    const {
      nodeClickName, summaryClickName
    } = outputSignalNames;

    instance.addSignalListener(nodeClickName, this.onNodeClick);
    instance.addSignalListener(summaryClickName, this.onSummaryClick);

    return Observable.empty();
  }

  private setDataTuples(instance: any): Observable<any> {
    const { nodesName, summariesName } = inputDataSetNames;

    const singleNodes = this.queryAndSetDataTuples(
      instance, this.initialNodePaths, this.service.queryNodes, nodesName,
      (node) => convertToInternalSingleNode(node, {
        colorField: this.colorField,
        opacityField: this.opacityField,
        summaryType: this.summaryType
      })
    );

    const leafPaths = singleNodes.map(filterLeafs)
      .map((nodes) => nodes.map((node) => node.path));

    this.numPathsRef = { max: -1 };
    const summaryNodes = this.queryAndSetDataTuples(
      instance, leafPaths, this.service.querySummaryNodes, summariesName,
      (node) => convertToInternalSummaryNode(node, {
        colorField: this.colorField,
        opacityField: this.opacityField,
        summaryType: this.summaryType,
        numPathsRef: this.numPathsRef
      })
    ).do(this.adjustPercentages);

    return summaryNodes;
  }

  private queryAndSetDataTuples<T, U>(
    instance: any, paths: string | string[] | Observable<string[]>,
    queryFunc: (paths: string[]) => Observable<U[]>,
    changeset: string | any, modifier?: (tuple: U) => T,
  ): Observable<T[]> {
    paths = typeof paths === 'string' ? [paths] : paths;
    paths = Array.isArray(paths) ? Observable.of(paths) : paths;

    const insert = typeof changeset === 'string' ?
      instance.insert.bind(instance, changeset) :
      changeset.insert.bind(changeset);

    const rawTuples: Observable<any[]> = paths.mergeMap(queryFunc);
    const allRawTuples = rawTuples.reduce((acc, tuples_) => acc.concat(tuples_), []);
    const tuples = modifier ? allRawTuples.map((tuples_) => tuples_.map(modifier)) : allRawTuples as Observable<T[]>;

    return tuples.do(insert);
  }

  @Bind
  onEncodingChange() {
    const { nodesName, summariesName } = inputDataSetNames;
    const instance = this.vegaInstance;
    const nodesData = instance.data(nodesName) as InternalSingleNode[];

    this.initialNodePaths = nodesData.map((inode) => inode.path);

    // FIXME Evil hack
    this.destroyVegaInstance();
    this.createVegaInstance();

    // const { nodesName, summariesName } = inputDataSetNames;
    // const instance = this.vegaInstance;
    //
    // const nodesData = instance.data(nodesName) as InternalSingleNode[];
    // const summariesData = instance.data(summariesName) as InternalSummaryNode[];
    //
    // nodesData.forEach((node) => convertToInternalSingleNode(node, {
    //   colorField: this.colorField,
    //   opacityField: this.opacityField,
    //   summaryType: this.summaryType
    // }));
    //
    // this.numPathsRef = {max: -1};
    // summariesData.forEach((node) => convertToInternalSummaryNode(node, {
    //   colorField: this.colorField,
    //   opacityField: this.opacityField,
    //   summaryType: this.summaryType,
    //   numPathsRef: this.numPathsRef
    // }));
    //
    // instance.change(nodesName, vega.changeset().reflow());
    // instance.change(
    //   summariesName,
    //   vega.changeset().encode(() => true, 'totalNumPaths').reflow()
    // );
    // instance.run();
  }

  // Events
  // Do not call vegaInstance.run() directly in the callbacks!
  // Use vegaInstance.runAfter(vegaInstance.run.bind(vegaInstance))
  @Bind
  private onNodeClick(name: string, node: InternalSingleNode): void {
    if (node === undefined || node.isLeaf) {
      return;
    }

    const { nodesName, summariesName } = inputDataSetNames;
    const instance = this.vegaInstance;
    const nodes: InternalSingleNode[] = instance.data(nodesName);
    const expanded = nodes.some((inode) => isParentOf(node, inode));
    const nodeChanges = vega.changeset();
    const summaryChanges = vega.changeset();
    const events: Observable<any>[] = [];
    this.numPathsRef[node.path] = 0;
    this.numPathsRef.max = 0;
    // this.numPathsRef.maxPixelHeight = 35;

    if (expanded) {
      nodeChanges.remove((inode) => isAncestorOf(node, inode));
      summaryChanges.remove((inode) => isAncestorOf(node, inode));
      events.push(this.queryAndSetDataTuples(
        instance, node.path, this.service.querySummaryNodes, summaryChanges,
        (node_) => convertToInternalSummaryNode(node_, {
          colorField: this.colorField,
          opacityField: this.opacityField,
          summaryType: this.summaryType,
          numPathsRef: this.numPathsRef
        })
      ).do(this.adjustPercentages));
    } else {
      summaryChanges.remove((inode) => isAncestorOf(node, inode));
      const childNodes = this.queryAndSetDataTuples(
        instance, node.path, this.service.queryChildNodes, nodeChanges,
        (node_) => convertToInternalSingleNode(node_, {
          colorField: this.colorField,
          opacityField: this.opacityField,
          summaryType: this.summaryType
        })
      );
      const childNodePaths = childNodes.map((snode) => snode.map((n) => n.path));
      const childSummaryNodes = this.queryAndSetDataTuples(
        instance, childNodePaths, this.service.querySummaryNodes, summaryChanges,
        (node_) => convertToInternalSummaryNode(node_, {
          colorField: this.colorField,
          opacityField: this.opacityField,
          summaryType: this.summaryType,
          numPathsRef: this.numPathsRef
        })
      ).do(this.adjustPercentages);

      events.push(childSummaryNodes);
    }

    // Apply changes after all events have completed and rerun dataflow
    Observable.forkJoin(...events).subscribe(undefined, undefined, () => {
      instance.change(nodesName, nodeChanges);
      instance.change(summariesName, summaryChanges);
      instance.runAfter(instance.run.bind(instance));

      // Evil Hack Part Deux - For Bug #46
      instance.runAfter(this.onEncodingChange);
    });
  }

  @Bind
  private onSummaryClick(name: string, node: InternalSummaryNode): void {
    // TODO
    // Outline
    // Remove this node and direct and indirect children with isAncestorOf
    // Add SingleNodes for this node's parent
    // Add summaries for the inserted nodes
  }

  @Bind
  private adjustPercentages(nodes: InternalSummaryNode[]) {
    const { summaryBoxSizeName } = inputSignalNames;
    const minPixelHeight = 2;
    const maxPixelHeight = this.vegaInstance.signal(summaryBoxSizeName).height;

    calculateMultiplier(this.numPathsRef, nodes);

    nodes.forEach((n) => {
      const expected = minPixelHeight / (maxPixelHeight * n.multiplier); // expected percentage for a small partition
      const indices = []; // for keeping track of indices which have percentage greater than expected
      let diffSum = 0 ; // sum of differences from expected percentage across all partitions

      // calculates sum of differences and tracks indices which have percentages greater than expected
      n.partitions.forEach((p, i) => {
        if (p.percentage !== 0 && p.percentage < expected) {
          diffSum += expected - p.percentage;
          p.percentage = expected;
        } else {
          indices.push(i);
        }
      });

      /* Decreases percentage of partitions, which have percentages greater than expected
        If by decreasing the percentage of a partition, it in turn becomes smaller than
        expected, then diffSum is adjusted by removing (expected - partition.percentage
        + diff) from it and the partitions percentage is increased to match expected.
      */
      indices.forEach((i, j) => {
        const diff = diffSum / ((indices.length - j) || 1);
        const p = n.partitions[i];

        if (p.percentage - diff < expected) {
          diffSum -= expected - p.percentage + diff;
          p.percentage = expected;
        } else {
          diffSum -= diff;
          p.percentage -= diff;
        }
      });

      // cumulative percentage is recalculated to adjust partition offsets.
      n.partitions.reduce((c, p) => {
        p.cumPercentage = c;
        return c + p.percentage;
      }, 0);
    });
  }
}
