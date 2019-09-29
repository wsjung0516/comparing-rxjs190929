import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { VanillaFuncComponent } from './vanilla-func/vanilla-func.component';
import { RxjsFuncComponent } from './rxjs-func/rxjs-func.component';

@NgModule({
  declarations: [
    AppComponent,
    VanillaFuncComponent,
    RxjsFuncComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
