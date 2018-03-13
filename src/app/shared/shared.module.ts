import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatButtonModule,
  MatSidenavModule,
  MatRadioModule,
  MatCheckboxModule,
  MatCardModule,
  MatToolbarModule,
  MatTabsModule,
  MatTableModule
} from '@angular/material';

const MATERIAL_MODULES: any[] = [
  MatButtonModule, MatSidenavModule, MatRadioModule, MatCheckboxModule,
  MatCardModule, MatToolbarModule, MatTabsModule, MatTableModule
];

@NgModule({
  imports: [
    MATERIAL_MODULES
  ],
  exports: [
    MATERIAL_MODULES
  ]
})
export class SharedModule { }
