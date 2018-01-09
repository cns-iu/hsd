import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MaterialModule } from './hsd-ui/material.module';
import { HsdUiModule } from './hsd-ui';
import { AppComponent } from './app.component';



@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    HsdUiModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
