import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {VanillaFuncComponent} from './vanilla-func/vanilla-func.component';
import {RxjsFuncComponent} from './rxjs-func/rxjs-func.component';
import {CanvasComponent} from './canvas/canvas.component';
import {PaintComponent} from './paint/paint.component';
import {CommTestComponent} from './comm-test/comm-test.component';
import {ShortKeyComponent} from './short-key/short-key.component';
import {PlayPauseComponent} from './play-pause/play-pause.component';
import {FilterObjectComponent} from './filter-object/filter-object.component';
import {UltimateSubjectComponent} from './ultimate-subject/ultimate-subject.component';
import {SliderTestComponent} from './slider-test/slider-test.component';
import {FileUploadComponent} from "./file-upload/file-upload.component";
import {ColumnResizeComponent} from "./column-resize/column-resize.component";


const routes: Routes = [
  { path: '', component: ColumnResizeComponent, pathMatch: 'full'},
//  { path: '', component: CommTestComponent, pathMatch: 'full'},
  { path: 'rxjs', component: RxjsFuncComponent},
  { path: 'vanilla', component: VanillaFuncComponent},
  { path: 'canvas', component: PaintComponent},
  { path: 'comm-test', component: CommTestComponent},
  { path: 'shortKeys', component: ShortKeyComponent},
  { path: 'play-pause', component: PlayPauseComponent},
  { path: 'filter-object', component: FilterObjectComponent},
  { path: 'ultimate-subject', component: UltimateSubjectComponent },
  { path: 'slider-test', component: SliderTestComponent },
  { path: 'file-upload', component: FileUploadComponent },
  { path: 'column-resizable', component: ColumnResizeComponent },
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
