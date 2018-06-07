import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { CoreModule } from './core';
import { HsdUiModule } from './hsd-ui';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,

    CoreModule,
    HsdUiModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
