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

  @Output("OnSelectedItemChange") SelectedItemChange = new EventEmitter<DropDownListEventArgs>();
  //DataValueFieldName:string;
  constructor() {
    this.List=[]; 

    // this.List.push({"ID":"1", "Car":"BMW"});
    // this.List.push({"ID":"2", "Car":"Mercedeze"});
    // this.List.push({"ID":"3", "Car":"Toyota"});
    // this.List.push({"ID":"4", "Car":"Audi"});

    this.DisplayValueFieldName = "ItemText";
    //this.DataValueFieldName = "ID";
  }

  OnItemChange(){
    console.log("Inner Component Trigger Event");
    let eventArgs:DropDownListEventArgs = new DropDownListEventArgs(this, this.SelectedItem);
    this.SelectedItemChange.emit(eventArgs);
  }

}

export class DropDownListEventArgs{
  Sender:EcuTekDropDownListComponent;
  SelectedValue:any;

  constructor(sender:EcuTekDropDownListComponent, selectedValue:any){
    this.Sender=sender;
    this.SelectedValue=selectedValue;
  }
}