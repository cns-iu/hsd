import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';
import { MainContentComponent } from './main-content/main-content.component';
import { SharedModule } from '../shared';
import { HsdTreeModule } from '../hsd-tree';
import { InfoDialogComponent } from './info-dialog/info-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    BrowserAnimationsModule,
    HsdTreeModule
  ],
  exports: [
    MainContentComponent,
    HomeComponent
  ],
  declarations: [HomeComponent, MainContentComponent, InfoDialogComponent],
  entryComponents: [InfoDialogComponent]
})
export class HsdUiModule { }
