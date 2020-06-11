import { Component, OnInit, ComponentFactoryResolver, ViewChild } from '@angular/core';
import {PopupContentsDirective} from './EcuTekComponents/popup-contents.directive';

@Component({
  selector: 'pup-component',
  templateUrl: './popup-component.component.html',
  styleUrls: ['./popup-component.component.css']
})
export class PopupComponentComponent implements OnInit {
  @ViewChild(PopupContentsDirective) adHost: PopupContentsDirective;

  HeadingName:string;
  constructor(private componentFactoryResolver: ComponentFactoryResolver) { 
    this.HeadingName = "Test Popup";


  }

  ngOnInit() {
  }

  loadComponent(component:any){
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(component);
  }

}