import {
  Component, OnInit, OnChanges, OnDestroy,
  Input, ViewChild,
  ElementRef, SimpleChanges
} from '@angular/core';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/toArray';

import { vega, defaultLogLevel } from '../../vega';
import { SumTreeDataService } from '../shared/sum-tree-data.service';
import vegaSpec, { inputDataSetNames, outputSignalNames } from './vega-spec';

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

  private createVegaInstance(): void {
    const parsedSpec = vega.parse(vegaSpec);
    const instance = this.vegaInstance = new vega.View(parsedSpec)
      .renderer('svg') // In the future this might be replaced by a custom renderer
      .initialize(this.visElement.nativeElement, this.inputElement.nativeElement)
      .logLevel(this.vegaLogLevel)
      .hover(); // Enable default handling of hover

    // Attach signal listeners
    instance.addSignalListener(outputSignalNames.nodeClickName,
      this.onNodeClick.bind(this));
    instance.addSignalListener(outputSignalNames.summaryClickName,
      this.onSummaryClick.bind(this));

    instance.addSignalListener(outputSignalNames.summaryTypeName,
      this.onSummaryTypeChange.bind(this));
    instance.addSignalListener(outputSignalNames.colorName,
      this.onColorFieldChange.bind(this));
    instance.addSignalListener(outputSignalNames.opacityName,
      this.onOpacityFieldChange.bind(this));

    // Insert the initial data
    instance.insert(inputDataSetNames.nodesName, this.service.getInitialNodes());

    // Run visualization
    instance.run();
  }

  private destroyVegaInstance(): void {
    if (this.vegaInstance) {
      this.vegaInstance.finalize();
    }
  }

  private onNodeClick(name: string, value: any): void {
    // TODO
  }

  private onSummaryClick(name: string, value: any): void {
    // TODO
  }

  private onSummaryTypeChange(name: string, value: any): void {
    // TODO
  }

  private onColorFieldChange(name: string, value: any): void {
    // TODO
  }

  private onOpacityFieldChange(name: string, value: any): void {
    // TODO
  }
}
