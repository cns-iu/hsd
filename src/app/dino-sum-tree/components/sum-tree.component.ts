import {
  Component,
  OnInit, OnDestroy,
  ViewChild,
  ElementRef
} from '@angular/core';

@Component({
  selector: 'dino-sum-tree',
  templateUrl: './sum-tree.component.html',
  styleUrls: ['./sum-tree.component.sass']
})
export class SumTreeComponent implements OnInit, OnDestroy {
  private instance: any; // Vega instance

  @ViewChild('vegaAnchor') anchorElement: ElementRef;

  constructor() { }

  ngOnInit() {
  }

  ngOnDestroy() {
    // TODO
  }

}
