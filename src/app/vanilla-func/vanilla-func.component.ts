import {AfterViewInit, Component, OnInit} from '@angular/core';
import * as DragAndDrop from './vanilla-func.component.js';

@Component({
  selector: 'app-vanilla-func',
  templateUrl: './vanilla-func.component.html',
  styleUrls: ['./vanilla-func.component.css']
})
export class VanillaFuncComponent implements OnInit, AfterViewInit {

  constructor() { }

  ngOnInit() {
  }
  ngAfterViewInit(): void {
    // @ts-ignore
    DragAndDrop();
  }
}
