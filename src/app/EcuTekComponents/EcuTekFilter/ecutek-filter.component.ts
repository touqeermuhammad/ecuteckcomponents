import { Component} from '@angular/core';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'ecutek-filter',
  templateUrl: './ecutek-filter.component.html',
  styleUrls: ['./ecutek-filter.component.css']
})
export class EcuTekFilterComponent {

  DataType:string;
  constructor(){
    this.DataType="text";
  }
  @Output() Filter = new EventEmitter<void>();

  ApllyFilter(){
    this.Filter.emit();
  }
}