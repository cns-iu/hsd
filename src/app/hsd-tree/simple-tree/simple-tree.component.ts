import { Component, OnInit, ElementRef } from '@angular/core';
import * as vega from 'vega';
import * as vegaEmbed from 'vega-embed';
@Component({
  selector: 'hsd-simple-tree',
  templateUrl: './simple-tree.component.html',
  styleUrls: ['./simple-tree.component.sass']
})
export class SimpleTreeComponent implements OnInit {
  private parentNativeElement: any;
  spec = `https://gist.githubusercontent.com/axdanbol/d77ffabcc9cfb2f3c9b7d7e2404a7f8f/raw/69641dc469f9aff598523c61a203965dcd666ed3/hsd_vega_spec.json`;

  constructor(element: ElementRef) {
    this.parentNativeElement = element.nativeElement; // to get native parent element of this component
  }

  ngOnInit() {
    vega.loader()
    .load(this.spec)
    .then((data) => {
      this.render(JSON.parse(data));
    });
  }

  render(spec) {
    const view = new vega.View(vega.parse(spec))
    .renderer('canvas')  // set renderer (canvas or svg)
    .initialize(this.parentNativeElement) // initialize view within parent DOM container
    .hover()             // enable hover encode set processing
    .run();
  }

}
