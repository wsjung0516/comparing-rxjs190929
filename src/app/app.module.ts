import { BrowserModule } from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { VanillaFuncComponent } from './vanilla-func/vanilla-func.component';
import { RxjsFuncComponent } from './rxjs-func/rxjs-func.component';
import { CanvasComponent } from './canvas/canvas.component';
import { PaintComponent } from './paint/paint.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { CommTestComponent } from './comm-test/comm-test.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {ToastrModule} from 'ngx-toastr';
import {ErrorsModule} from './errors/errors.module';
import {ErrorsHandler} from './errors/errors-handler';
import {ServerErrorsInterceptor} from './errors/errors-interceptor/server-errors.interceptor';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { ShortKeyComponent } from './short-key/short-key.component';
import { HotkeysDialogComponent } from './short-key/hotkeys-dialog/hotkeys-dialog.component';
import { HelloComponent } from './short-key/hello/hello.component';
import {MatDialogModule} from '@angular/material';
import {NgxsStoragePluginModule} from '@ngxs/storage-plugin';
import {NgxsModule} from '@ngxs/store';
import {NgxsLoggerPluginModule} from '@ngxs/logger-plugin';
import {NgxsReduxDevtoolsPluginModule} from '@ngxs/devtools-plugin';
import {ShortKeyModule} from './short-key/short-key.module';
import { PlayPauseComponent } from './play-pause/play-pause.component';
import {AngularMaterialsModule} from '../shared/angular-materials/angular-materials.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import { FilterObjectComponent } from './filter-object/filter-object.component';
import { UltimateSubjectComponent } from './ultimate-subject/ultimate-subject.component';
import { SliderTestComponent } from './slider-test/slider-test.component';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { UploadProcessComponent } from './file-upload/upload-process/upload-process.component';
import {ReactiveFormsModule} from "@angular/forms";
import { ProgressComponent } from './file-upload/progress.component';

@NgModule({
  declarations: [
    AppComponent,
    VanillaFuncComponent,
    RxjsFuncComponent,
    CanvasComponent,
    PaintComponent,
    CommTestComponent,
    // ShortKeyComponent,
    HotkeysDialogComponent,
    // HelloComponent,
    PlayPauseComponent,
    FilterObjectComponent,
    UltimateSubjectComponent,
    SliderTestComponent,
    FileUploadComponent,
    UploadProcessComponent,
    ProgressComponent,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    NgxsModule.forRoot([]),
    NgxsStoragePluginModule.forRoot(),
    NgxsLoggerPluginModule.forRoot(),
    NgxsReduxDevtoolsPluginModule.forRoot(),
    ErrorsModule,
    ServiceWorkerModule.register('ngsw-worker.js', {enabled: environment.production}),
    ShortKeyModule,
    AngularMaterialsModule,
    FlexLayoutModule,
    ReactiveFormsModule
  ],
  providers: [
    {
      provide: ErrorHandler,
      useClass: ErrorsHandler,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ServerErrorsInterceptor,
      multi: true
    },
  ],
  bootstrap: [AppComponent],
  entryComponents: [HotkeysDialogComponent]
})
export class AppModule { }
