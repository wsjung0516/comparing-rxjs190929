import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {VanillaFuncComponent} from './vanilla-func/vanilla-func.component';
import {RxjsFuncComponent} from './rxjs-func/rxjs-func.component';
import {CanvasComponent} from './canvas/canvas.component';
import {PaintComponent} from './paint/paint.component';
import {CommTestComponent} from './comm-test/comm-test.component';
import {ShortKeyComponent} from './short-key/short-key.component';
import {PlayPauseComponent} from './play-pause/play-pause.component';


const routes: Routes = [
  { path: '', component: CommTestComponent, pathMatch: 'full'},
  { path: 'rxjs', component: RxjsFuncComponent},
  { path: 'vanilla', component: VanillaFuncComponent},
  { path: 'canvas', component: PaintComponent},
  { path: 'comm-test', component: CommTestComponent},
  { path: 'shortKeys', component: ShortKeyComponent},
  { path: 'play-pause', component: PlayPauseComponent}
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
