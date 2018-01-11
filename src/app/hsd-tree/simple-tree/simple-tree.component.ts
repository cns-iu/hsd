import { Component, OnInit, ElementRef } from '@angular/core';
import * as vega from 'vega';
import * as data from './spec.json';

@Component({
  selector: 'hsd-simple-tree',
  templateUrl: './simple-tree.component.html',
  styleUrls: ['./simple-tree.component.sass']
})
export class SimpleTreeComponent implements OnInit {
  private parentNativeElement: any;

  constructor(element: ElementRef) {
    this.parentNativeElement = element.nativeElement; // to get native parent element of this component
  }

  ngOnInit() {
  this.render();
  }

  render() {
    const view = new vega.View(vega.parse(data))
      .renderer('canvas')  // set renderer (canvas or svg)
      .initialize(this.parentNativeElement) // initialize view within parent DOM container
      .hover()             // enable hover encode set processing
      .run();
    // for exporting to png
    //   view.toImageURL('png').then((url) => {
    //   const link = document.createElement('a');
    //   link.setAttribute('href', url);
    //   link.setAttribute('target', '_blank');
    //   link.setAttribute('download', 'vega-export.png');
    //   link.dispatchEvent(new MouseEvent('click'));
    // }).catch((error) => { /* error handling */ });

  }

}
