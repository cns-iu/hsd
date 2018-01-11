import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MaterialModule } from './hsd-ui/material.module';
import { CoreModule } from './core';
import { SharedModule } from './shared';
import { HsdUiModule } from './hsd-ui';
import { AppComponent } from './app.component';



@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    CoreModule,
    SharedModule,
    HsdUiModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
