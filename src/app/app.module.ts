import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { DuckBoxContainerComponent } from './duck-box-container/duck-box-container.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DuckBoxContainerComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
