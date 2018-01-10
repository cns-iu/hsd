import { Component, OnInit, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as vega from 'vega';

@Component({
  selector: 'hsd-sum-tree',
  templateUrl: './sum-tree.component.html',
  styleUrls: ['./sum-tree.component.sass']
})
export class SumTreeComponent implements OnInit {
  private parentNativeElement: any;
  private spec = '';

  constructor(element: ElementRef, private http: HttpClient) {
    this.parentNativeElement = element.nativeElement;
  }

  ngOnInit() {
    this.http.get('./assets/data/sum-tree/spec.json').subscribe((data) => {
      this.render(data);
    });
    /*vega.loader()
      .load(this.spec)
      .then((data) => {
        this.render(JSON.parse(data));
      });*/
  }

  render(spec) {
    const view = new vega.View(vega.parse(spec))
      .renderer('canvas')  // set renderer (canvas or svg)
      .initialize(this.parentNativeElement) // initialize view within parent DOM container
      .hover()             // enable hover encode set processing
      .run();
  }
}
