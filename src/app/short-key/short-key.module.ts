import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShortKeyRoutingModule } from './short-key-routing.module';
import {NgxsModule} from '@ngxs/store';
import {ShortKeyComponent} from './short-key.component';
import {HelloComponent} from './hello/hello.component';


@NgModule({
  declarations: [ShortKeyComponent, HelloComponent],
  imports: [
    CommonModule,
    ShortKeyRoutingModule,
    NgxsModule.forFeature([])
  ]
})
export class ShortKeyModule { }
