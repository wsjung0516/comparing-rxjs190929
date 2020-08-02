import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatButtonModule, MatButtonToggleModule, MatDialogModule, MatIconModule, MatSliderModule} from '@angular/material';

const modules = [
  MatButtonModule,
  MatDialogModule,
  MatSliderModule,
  MatButtonToggleModule,
  MatIconModule
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ...modules
  ],
  exports: [
    ...modules
  ]
})
export class AngularMaterialsModule { }
