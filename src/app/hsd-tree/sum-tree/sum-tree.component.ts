import { Component, OnInit, ElementRef } from '@angular/core';
import * as vega from 'vega';
import * as data from './spec.json';

@Component({
  selector: 'hsd-sum-tree',
  templateUrl: './sum-tree.component.html',
  styleUrls: ['./sum-tree.component.sass']
})
export class SumTreeComponent implements OnInit {
  private parentNativeElement: any;

  constructor(element: ElementRef) {
    this.parentNativeElement = element.nativeElement;
  }

  ngOnInit() {
    this.render(data);
  }

  render(spec) {
    const view = new vega.View(vega.parse(spec))
      .renderer('canvas')  // set renderer (canvas or svg)
      .initialize(this.parentNativeElement) // initialize view within parent DOM container
      .hover()             // enable hover encode set processing
      .run();
  }
}
