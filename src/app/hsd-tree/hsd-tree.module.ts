import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SimpleTreeComponent } from './simple-tree/simple-tree.component';
import { SumTreeComponent } from './sum-tree/sum-tree.component';
import { SumTreeV2Component } from './sum-tree-v2/sum-tree-v2.component';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    SimpleTreeComponent, SumTreeComponent, SumTreeV2Component
  ],
  declarations: [SimpleTreeComponent, SumTreeComponent, SumTreeV2Component]
})
export class HsdTreeModule { }
