import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VegaComponent } from './vega/vega.component';
import { DataComponent } from './data/data.component';
import { SignalComponent } from './signal/signal.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [VegaComponent, DataComponent, SignalComponent]
})
export class DinoVegaModule { }
