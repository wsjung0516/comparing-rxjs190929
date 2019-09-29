import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { VanillaFuncComponent } from './vanilla-func/vanilla-func.component';
import { RxjsFuncComponent } from './rxjs-func/rxjs-func.component';
import { CanvasComponent } from './canvas/canvas.component';
import { PaintComponent } from './paint/paint.component';

@NgModule({
  declarations: [
    AppComponent,
    VanillaFuncComponent,
    RxjsFuncComponent,
    CanvasComponent,
    PaintComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
