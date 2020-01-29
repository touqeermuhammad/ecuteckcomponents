import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: "ecutek-dropdownlist",
  templateUrl: "./ecutek-dropdownlist.component.html",
  styleUrls: ["./ecutek-dropdownlist.component.css"]
})
export class EcuTekDropDownListComponent implements OnInit{

  @Input("DataSource") List:any[];
  SelectedItem:null;
  @Input() DisplayValueFieldName:string;
  @Input() Name:string;

  @Output("OnSelectedItemChange") SelectedItemChange = new EventEmitter<DropDownListEventArgs>();
  @Output("OnInitialisation") RegisterComponentToParent = new EventEmitter<DropDownListEventArgs>();

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


  ngOnInit(){
     let typeName:string = this.constructor.toString().replace("function ", "").substring(0,this.constructor.toString().replace("function ", "").indexOf('('));
    let eventArgs:DropDownListEventArgs = new DropDownListEventArgs(this, typeName);
    this.RegisterComponentToParent.emit(eventArgs);
  }
}
 
export class DropDownListEventArgs{
  Sender:EcuTekDropDownListComponent;
  TypeName:String;

  constructor(sender:EcuTekDropDownListComponent, typeName:string){
    this.Sender=sender;
    this.TypeName=typeName;
  }
}