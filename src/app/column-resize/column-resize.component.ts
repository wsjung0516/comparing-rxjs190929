import { Component, OnInit } from '@angular/core';
export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];
@Component({
  selector: 'app-column-resize',
  template: `
    <h1>Knights of the Round Table</h1>
    <table mat-table [dataSource]="dataSource" class="mat-elevation-z8">

      <!-- Position Column -->
      <ng-container matColumnDef="position">
        <th resizable mat-header-cell *matHeaderCellDef> No. </th>
        <td mat-cell *matCellDef="let element"> {{element.position}} </td>
      </ng-container>

      <!-- Name Column -->
      <ng-container matColumnDef="name">
        <th resizable mat-header-cell *matHeaderCellDef> Name </th>
        <td mat-cell *matCellDef="let element"> {{element.name}} </td>
      </ng-container>

      <!-- Weight Column -->
      <ng-container matColumnDef="weight">
        <th resizable mat-header-cell *matHeaderCellDef> Weight </th>
        <td mat-cell *matCellDef="let element"> {{element.weight}} </td>
      </ng-container>

      <!-- Symbol Column -->
      <ng-container matColumnDef="symbol">
        <th resizable mat-header-cell *matHeaderCellDef> Symbol </th>
        <td mat-cell *matCellDef="let element"> {{element.symbol}} </td>
      </ng-container>

      <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
      <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
    </table>

<!--
    <table>
      <thead>
      <tr>
        <th resizable>Member</th>
        <th resizable>Nickname</th>
        <th>Fate</th>
      </tr>
      </thead>
      <tbody>
      <tr *ngFor="let row of rows">
        <td *ngFor="let cell of row">{{cell}}</td>
      </tr>
      </tbody>
    </table>
-->
  `,
  styles: [`
    table {
      position: relative;
      width: 100%;
      border-radius: 100%;
      background: rgba(0, 0, 0, 0.1);
    }

    th, td {
      text-align: left;
      padding-left: 12px;
      box-sizing: border-box;
    }

    tr:nth-child(odd) {
      background: rgba(0, 0, 0, 0.05);
    }
    .mat-column-position {
      /*flex: 0 0 30% !important;*/
      /*width: 30% !important;*/
    }
    .mat-column-name {
      /*flex: 0 0 30% !important;*/
      width: 30% !important;
    }
    .mat-column-weight {
      /*flex: 0 0 30% !important;*/
      /*width: 30% !important;*/
    }
    .mat-column-symbol {
      /*flex: 0 0 10% !important;*/
      width: 10% !important;
    }

  `]
})
export class ColumnResizeComponent implements OnInit {
/*
  readonly rows = [
    ["King Arthur", "-", "Arrested"],
    ["Sir Bedevere", "The Wise", "Arrested"],
    ["Sir Lancelot", "The Brave", "Arrested"],
    ["Sir Galahad", "The Chaste", "Killed"],
    ["Sir Robin", "The Not-Quite-So-Brave-As-Sir-Lancelot", "Killed"],
  ];
*/
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = ELEMENT_DATA;

  constructor() { }

  ngOnInit() {
  }

}
