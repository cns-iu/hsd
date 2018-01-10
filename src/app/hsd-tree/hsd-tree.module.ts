import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SimpleTreeComponent } from './simple-tree/simple-tree.component';
import { SumTreeComponent } from './sum-tree/sum-tree.component';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    SimpleTreeComponent
  ],
  declarations: [SimpleTreeComponent, SumTreeComponent]
})
export class HsdTreeModule { }
