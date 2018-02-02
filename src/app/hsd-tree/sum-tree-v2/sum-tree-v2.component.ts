import { Component, Input, OnInit, OnDestroy, ElementRef } from '@angular/core';

import { vega, defaultLogLevel } from '../../vega';
import spec from './spec';
import { subtreeBreakdown, nodes } from '../shared/mock-data';

@Component({
  selector: 'hsd-sum-tree-v2',
  templateUrl: './sum-tree-v2.component.html',
  styleUrls: ['./sum-tree-v2.component.sass']
})
export class SumTreeV2Component implements OnInit, OnDestroy {
  private parentNativeElement: any;
  private view: any;

  @Input() subtreeBreakdown: any[] = subtreeBreakdown;
  @Input() nodes: any[] = nodes;
  @Input() logLevel = defaultLogLevel;

  constructor(element: ElementRef) {
    this.parentNativeElement = element.nativeElement;
  }

  ngOnInit() {
    this.render(spec);
  }

  ngOnDestroy() {
    this.view.finalize();
  }

  render(vegaSpec: any): void {
    if (this.view) {
      this.view.finalize();
    }
    this.view = new vega.View(vega.parse(vegaSpec))
      .renderer('svg')
      .initialize(this.parentNativeElement)
      .logLevel(this.logLevel)
      .hover()
      .insert('nodeLookup', this.nodes)
      .insert('barBreakdown', this.subtreeBreakdown)
      .run();

    if (this.logLevel >= 2) {
      console.log('sum-tree', this);
    }
  }
}
