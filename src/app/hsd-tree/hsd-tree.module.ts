import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared';

import { SumTreeDataService } from './shared/sum-tree-data.service';

import { SumTreeComponent } from './sum-tree/sum-tree.component';
import { SumTreeEndpointDataService } from './shared/sum-tree-endpoint-data-service';

@NgModule({
  imports: [
    CommonModule,

    SharedModule
  ],
  exports: [
    SumTreeComponent
  ],
  declarations: [
    SumTreeComponent
  ],
  providers: [
    SumTreeDataService,
    SumTreeEndpointDataService
  ]
})
export class HsdTreeModule { }
