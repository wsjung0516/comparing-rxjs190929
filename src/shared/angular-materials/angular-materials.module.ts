import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatButtonModule, MatDialogModule} from '@angular/material';

const modules = [
  MatButtonModule,
  MatDialogModule,
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
