import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DinoSumTreeComponent } from './sum-tree/dino-sum-tree.component';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    DinoSumTreeComponent
  ],
  declarations: [
    DinoSumTreeComponent
  ],
  providers: []
})
export class DinoSumTreeModule { }
