import { Component, Input, Output, EventEmitter} from '@angular/core';
import { EcuTekBaseComponent } from '../../EcuTekComponents/EcuTekBase/ecutek-base.component';

@Component({
  selector: "ecutek-dropdownlist",
  templateUrl: "./ecutek-dropdownlist.component.html",
  styleUrls: ["./ecutek-dropdownlist.component.css"]
})
export class EcuTekDropDownListComponent extends EcuTekBaseComponent{

  @Input("DataSource") List: any[];
  SelectedItem: any;
  @Input() DisplayValueFieldName: string;
  

  @Output("OnSelectedItemChange") SelectedItemChange = new EventEmitter<DropDownListEventArgs>();
  constructor() {
    super();

    this.List = [];
    this.SelectedItem = {};
    this.DisplayValueFieldName = "";
    //this.DataValueFieldName = "ID";
  }

  OnItemChange() {
    let eventArgs: DropDownListEventArgs = new DropDownListEventArgs(this, this.SelectedItem);
    this.SelectedItemChange.emit(eventArgs);
  }

}
 
export class DropDownListEventArgs {
  Sender: EcuTekDropDownListComponent;
  SelectedItem: any;

  constructor(sender: EcuTekDropDownListComponent, selectedItem: any) {
    this.Sender = sender;
    this.SelectedItem = selectedItem;
  }
}
