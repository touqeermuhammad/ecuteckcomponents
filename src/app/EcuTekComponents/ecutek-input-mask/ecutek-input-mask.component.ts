import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'ecutek-input-mask',
  templateUrl: './ecutek-input-mask.component.html',
  styleUrls: ['./ecutek-input-mask.component.css']
})
export class EcutekInputMaskComponent implements OnInit {

  @Input("TextValue") textValue:string;
  @Input("Pattern") pattern:string;
  @Input("Format") formatStyle:string;
  @Input("MaxLength") maxLength:number;

  private isValidInput: boolean;

  constructor() { 
    this.textValue = "";
    this.pattern = "";
    this.formatStyle = "";
    this.isValidInput = true;
    this.maxLength = 0;
  }

  ngOnInit() {
  }

  private onTextChange(event: any){

    this.isValidInput = true;

    if(this.pattern != "" && event != ""){
      let regExp = new RegExp(this.pattern);
      this.isValidInput = regExp.test(event);
      if(this.isValidInput){
        this.textValue = this.textValue;
        return;
      }
    }

    this.textValue = event.toString().toUpperCase();
    console.log(this.textValue);
  }

}