import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';
import { MainContentComponent } from './main-content/main-content.component';
import { MaterialModule } from './material.module';
import { HsdTreeModule } from '../hsd-tree';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    BrowserAnimationsModule,
    HsdTreeModule
  ],
  exports: [
    MainContentComponent,
    HomeComponent
  ],
  declarations: [HomeComponent, MainContentComponent]
})
export class HsdUiModule { }