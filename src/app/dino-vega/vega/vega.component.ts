import {
  Component, ElementRef, QueryList,
  OnInit, OnDestroy,
  ViewChild, ViewChildren
} from '@angular/core';

import * as vega from 'vega';

@Component({
  selector: 'app-vega',
  templateUrl: './vega.component.html',
  styleUrls: ['./vega.component.sass']
})
export class VegaComponent implements OnInit, OnDestroy {
  instance: any; // Vega instance

  @ViewChild('anchor') entryPoint: ElementRef;

  // TODO

  constructor() {
    // TODO
  }

  ngOnInit() {
    // TODO
  }

  ngOnDestroy() {
    // TODO
  }
}
