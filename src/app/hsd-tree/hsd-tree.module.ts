import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SimpleTreeComponent } from './simple-tree/simple-tree.component';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    SimpleTreeComponent
  ],
  declarations: [SimpleTreeComponent]
})
export class HsdTreeModule { }
