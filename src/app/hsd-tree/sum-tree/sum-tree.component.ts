import { Component, OnInit, OnDestroy, ElementRef } from '@angular/core';
import * as vega from 'vega';

import { environment } from './../../shared';
import * as sumTreeSpec from './spec.json';
import { subtreeBreakdown } from './data';

const developmentLogLevel = vega.Warn;
const logLevel = environment.production ? vega.None : developmentLogLevel;

@Component({
  selector: 'hsd-sum-tree',
  templateUrl: './sum-tree.component.html',
  styleUrls: ['./sum-tree.component.sass']
})
export class SumTreeComponent implements OnInit, OnDestroy {
  private parentNativeElement: any;
  private view: any;

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
    this.view = new vega.View(vega.parse(spec))
      .renderer('canvas')
      .initialize(this.parentNativeElement)
      .logLevel(logLevel)
      .hover()
      .insert('subtreeBreakdown', subtreeBreakdown)
      .insert('rawData', subtreeBreakdown)
      .run();
  }
}
