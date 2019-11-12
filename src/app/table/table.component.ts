import { Component, OnInit, Input, Output , EventEmitter} from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent {
  @Input('data') data :  Array<any>;
  @Output ('onRowClick') onRowClick = new EventEmitter<string>();
  

  rowClicked(objectID : string){
    this.onRowClick.emit(objectID);
  }

}
