import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SumTreeComponent } from './components/sum-tree.component';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    SumTreeComponent
  ],
  declarations: [
    SumTreeComponent
  ],
  providers: []
})
export class SumTreeModule { }
