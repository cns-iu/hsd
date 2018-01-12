import { Component, Input, OnInit, OnDestroy, ElementRef } from '@angular/core';

import { vega, defaultLogLevel } from '../../vega';
import * as sumTreeSpec from './spec.json';
import { subtreeBreakdown, nodes } from '../shared/mock-data';

@Component({
  selector: 'hsd-sum-tree',
  templateUrl: './sum-tree.component.html',
  styleUrls: ['./sum-tree.component.sass']
})
export class SumTreeComponent implements OnInit, OnDestroy {
  private parentNativeElement: any;
  private view: any;

  @Input() subtreeBreakdown: any[] = subtreeBreakdown;
  @Input() nodes: any[] = nodes;
  @Input() logLevel = defaultLogLevel;

  constructor(element: ElementRef) {
    this.parentNativeElement = element.nativeElement;
  }

  ngOnInit() {
    this.render(sumTreeSpec);
  }

  ngOnDestroy() {
    this.view.finalize();
  }

  render(spec: any): void {
    if (this.view) {
      this.view.finalize();
    }
    this.view = new vega.View(vega.parse(spec))
      .renderer('svg')
      .initialize(this.parentNativeElement)
      .logLevel(this.logLevel)
      .hover()
      .insert('subtreeBreakdown', this.subtreeBreakdown)
      .insert('rawNodes', this.nodes)
      .run();
  }
}
