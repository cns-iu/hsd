import { Component, Input, OnInit, OnDestroy, ElementRef } from '@angular/core';

import { vega, defaultLogLevel } from '../../vega';
import spec from './spec';
import { subtreeBreakdown, nodes } from '../shared/mock-data';

@Component({
  selector: 'hsd-sum-tree-v3',
  templateUrl: './sum-tree-v3.component.html',
  styleUrls: ['./sum-tree-v3.component.sass']
})
export class SumTreeV3Component implements OnInit, OnDestroy {
  private parentNativeElement: any;
  private view: any;

  @Input() logLevel = defaultLogLevel;
  @Input() subtreeBreakdown: any[] = subtreeBreakdown;
  @Input() nodes: any[] = nodes;
  @Input() initialClicked: string[] = [
    '\\PCORI\\DEMOGRAPHIC',
    '\\PCORI\\DIAGNOSIS',
    '\\PCORI\\ENCOUNTER',
    '\\PCORI\\ENROLLMENT',
    '\\PCORI\\LAB_RESULT_CM',
    '\\PCORI\\MEDICATION',
    '\\PCORI\\VITAL'
  ];

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
      .insert('clickedNodes', this.initialClicked.map((path) => ({data: path})))
      .run();

    if (this.logLevel >= 2) {
      console.log('sum-tree', this);
    }
  }
}
