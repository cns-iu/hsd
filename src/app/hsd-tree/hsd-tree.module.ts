import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SimpleTreeComponent } from './simple-tree/simple-tree.component';
import { SumTreeComponent } from './sum-tree/sum-tree.component';
import { SumTreeV2Component } from './sum-tree-v2/sum-tree-v2.component';
import { SumTreeV3Component } from './sum-tree-v3/sum-tree-v3.component';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    SimpleTreeComponent, SumTreeComponent, SumTreeV2Component,
    SumTreeV3Component
  ],
  declarations: [
    SimpleTreeComponent, SumTreeComponent, SumTreeV2Component,
    SumTreeV3Component
  ]
})
export class HsdTreeModule { }
