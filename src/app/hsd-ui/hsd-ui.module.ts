import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared';
import { HsdTreeModule } from '../hsd-tree';

import { HomeComponent } from './home/home.component';
import { InfoDialogComponent } from './info-dialog/info-dialog.component';
import { LegendComponent } from './legend/legend.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    HsdTreeModule
  ],
  exports: [HomeComponent, InfoDialogComponent],
  declarations: [HomeComponent, InfoDialogComponent, LegendComponent],
  entryComponents: [InfoDialogComponent]
})
export class HsdUiModule { }
