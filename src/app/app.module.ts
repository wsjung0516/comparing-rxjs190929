import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { VanillaFuncComponent } from './vanilla-func/vanilla-func.component';
import { RxjsFuncComponent } from './rxjs-func/rxjs-func.component';
import { CanvasComponent } from './canvas/canvas.component';
import { PaintComponent } from './paint/paint.component';
import {HttpClientModule} from '@angular/common/http';
import { CommTestComponent } from './comm-test/comm-test.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {ToastrModule} from 'ngx-toastr';
import {ErrorsModule} from './errors/errors.module';

@NgModule({
  declarations: [
    AppComponent,
    VanillaFuncComponent,
    RxjsFuncComponent,
    CanvasComponent,
    PaintComponent,
    CommTestComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    ErrorsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
