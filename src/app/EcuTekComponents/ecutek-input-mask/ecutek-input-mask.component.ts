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

  private isValidInput: boolean;

  constructor() { 
    this.textValue = "";
    this.pattern = "";
    this.formatStyle = "";
    this.isValidInput = true;
  }

  ngOnInit() {
  }

  private onTextChange(event: any){

    this.isValidInput = true;

    if(this.pattern != ""){
      let regExp = new RegExp(this.pattern);
      this.isValidInput = regExp.test(event);
      if(this.isValidInput){
        return;
      }
    }

    this.textValue = event;
    console.log(this.textValue);
  }

}