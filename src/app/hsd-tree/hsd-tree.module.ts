import { NgModule, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared';

import { SumTreeDataService } from './shared/sum-tree-data.service';
// import { SumTreeMockDataService } from './shared/sum-tree-mock-data.service';
import { SumTreeEndpointDataService } from './shared/sum-tree-endpoint-data.service';

import { SumTreeComponent } from './sum-tree/sum-tree.component';

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
    { provide: SumTreeDataService, useClass: SumTreeEndpointDataService }
  ]
})
export class HsdTreeModule { }
