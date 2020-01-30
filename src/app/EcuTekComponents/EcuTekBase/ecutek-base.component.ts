import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'ecutek-base',
  template: `NO View`,
})
export class EcuTekBaseComponent implements OnInit {

  TypeName: string
  @Input() Name: string;

  @Output("OnInitialisation") RegisterComponentToParent = new EventEmitter<EcuTekBaseComponent>();
  constructor() {
    this.TypeName = "";
    this.Name = "";
  }


  ngOnInit(): void {
    this.TypeName = this.constructor.toString().replace("function ", "").substring(0, this.constructor.toString().replace("function ", "").indexOf('('));
    this.RegisterComponentToParent.emit(this);
  }
}