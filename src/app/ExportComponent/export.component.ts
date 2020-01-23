import { Component, Input, Output, EventEmitter} from '@angular/core';
import { DropDownListEventArgs } from '';

@Component({
  selector: "expot-data",
  templateUrl: "./export.component.html",
  styleUrls: ["./export.component.css"]
})
export class ExportComponent{
  ExportTypes: any[];
  DataFiles: any[];
  SoftGroups: any[];
  MapClasses: any[];

  FilteredDataFiles:any[];

  constructor(){
    this.FilteredDataFiles = [];

    this.ExportTypes = [];
    this.ExportTypes.push({"ID":"-1", "TypeName":"Select"});
    this.ExportTypes.push({"ID":"1", "TypeName":"Pascal"});
    this.ExportTypes.push({"ID":"2", "TypeName":"CSV"});

    this.DataFiles = [];
    this.DataFiles.push({ "ID":"-1", "DataFile": "Select", "ExportType": "" });
    this.DataFiles.push({ "ID":"1", "DataFile": "Address", "ExportType": "CSV" });
    this.DataFiles.push({ "ID":"2", "DataFile": "MapDefs", "ExportType": "CSV" });
    this.DataFiles.push({ "ID":"3", "DataFile": "Address", "ExportType": "Pascal" });
    this.DataFiles.push({ "ID":"4", "DataFile": "MapDefs", "ExportType": "Pascal" });

    this.SoftGroups = [];
    this.SoftGroups.push({ "ID": "-1", "Name": "Select" });
    this.SoftGroups.push({ "ID": "1", "Name": "N55" });
    this.SoftGroups.push({ "ID": "2", "Name": "S55" });

    this.MapClasses = [];
    this.MapClasses.push({ "ID": "-1", "MapClassName": "Select" });
    this.MapClasses.push({ "ID": "1", "MapClassName": "1d" });
    this.MapClasses.push({ "ID": "2", "MapClassName": "2d" });
    this.MapClasses.push({ "ID": "3", "MapClassName": "3d" });    
  }

  OnSelectedItemChange($event:DropDownListEventArgs){
    let target = $event;

    if(target.Sender.Name == "ddlExportType"){
      this.FilteredDataFiles = this.DataFiles.filter(function(currentItem){
        return currentItem.ExportType == target.SelectedItem.TypeName;
      });
    }
  }

  DownloadFile(){
  }
}

