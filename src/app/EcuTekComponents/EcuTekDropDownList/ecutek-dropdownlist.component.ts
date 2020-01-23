import { Component, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: "ecutek-dropdownlist",
  templateUrl: "./ecutek-dropdownlist.component.html",
  styleUrls: ["./ecutek-dropdownlist.component.css"]
})
export class EcuTekDropDownListComponent{

  @Input("DataSource") List:any[];
  SelectedItem:null;
  @Input() DisplayValueFieldName:string;
  @Input() Name:string;

  @Output("OnSelectedItemChange") SelectedItemChange = new EventEmitter<DropDownListEventArgs>();
  constructor() {
    this.List=[]; 

    this.DisplayValueFieldName = "";
    this.Name="";
    //this.DataValueFieldName = "ID";
  }

  OnItemChange(){
    let eventArgs:DropDownListEventArgs = new DropDownListEventArgs(this, this.SelectedItem);
    this.SelectedItemChange.emit(eventArgs);
  }
}

export class DropDownListEventArgs{
  Sender:EcuTekDropDownListComponent;
  SelectedItem:any;

  constructor(sender:EcuTekDropDownListComponent, selectedItem:any){
    this.Sender=sender;
    this.SelectedItem=selectedItem;
  }
}