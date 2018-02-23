import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';

import { SumTreeDataService } from './shared/sum-tree-data.service';

import { SimpleTreeComponent } from './simple-tree/simple-tree.component';
import { SumTreeComponent } from './sum-tree/sum-tree.component';
import { SumTreeV2Component } from './sum-tree-v2/sum-tree-v2.component';
import { SumTreeV3Component } from './sum-tree-v3/sum-tree-v3.component';
import { SumTreeRewriteComponent } from './sum-tree-rewrite/sum-tree-rewrite.component';

@NgModule({
  imports: [
    CommonModule,
    MatSelectModule
  ],
  exports: [
    SimpleTreeComponent, SumTreeComponent, SumTreeV2Component,
    SumTreeV3Component, SumTreeRewriteComponent
  ],
  declarations: [
    SimpleTreeComponent, SumTreeComponent, SumTreeV2Component,
    SumTreeV3Component, SumTreeRewriteComponent
  ],
  providers: [
    SumTreeDataService
  ]
})
export class HsdTreeModule { }
