import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {
  MatButtonModule, MatCardModule, MatCheckboxModule, MatChipsModule, MatDialogModule,
  MatIconModule, MatRadioModule, MatSelectModule, MatSidenavModule, MatTableModule,
  MatTabsModule, MatToolbarModule, MatSlideToggleModule
} from '@angular/material';

const MATERIAL_MODULES: any[] = [
  MatButtonModule, MatCardModule, MatCheckboxModule, MatChipsModule, MatDialogModule,
  MatIconModule, MatRadioModule, MatSelectModule, MatSidenavModule, MatTableModule,
  MatTabsModule, MatToolbarModule, MatSlideToggleModule
];

@NgModule({
  imports: [ BrowserAnimationsModule, MATERIAL_MODULES ],
  exports: [ BrowserAnimationsModule, MATERIAL_MODULES ]
})
export class SharedModule { }
