import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { SimpleTreeComponent } from './simple-tree/simple-tree.component';
import { SumTreeComponent } from './sum-tree/sum-tree.component';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  exports: [
    SimpleTreeComponent, SumTreeComponent
  ],
  declarations: [SimpleTreeComponent, SumTreeComponent]
})
export class HsdTreeModule { }
