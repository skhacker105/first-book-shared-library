import { Component, Input } from '@angular/core';
import { AgGridModule } from 'ag-grid-angular';

@Component({
  selector: 'lib-table-view',
  standalone: true,
  imports: [AgGridModule],
  templateUrl: './table-view.component.html',
  styleUrl: './table-view.component.scss'
})
export class TableViewComponent {
  @Input() rowData : any[] = [
    {make: 'Toyota', model: 'Celica', price: 35000},
        {make: 'Ford', model: 'Mondeo', price: 32000},
        {make: 'Porsche', model: 'Boxter', price: 72000}
  ];
  @Input() columnDefs : any[] = [
    {headerName: 'Make', field: 'make'},
    {headerName: 'Model', field: 'model'},
    {headerName: 'Price', field: 'price', editable: true}
  ];
  @Input() defaultColDef : any = {};
}
