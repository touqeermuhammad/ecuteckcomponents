import { Component, OnInit, ComponentFactoryResolver, ViewChild } from '@angular/core';
import {PopupContentsDirective} from '../../EcuTekComponents/popup-contents.directive';
import {EcuTekDropDownListComponent} from '../../EcuTekComponents/EcuTekDropDownList/ecutek-dropdownlist.component';


@Component({
  selector: 'pup-component',
  templateUrl: './popup-component.component.html',
  styleUrls: ['./popup-component.component.css']
})
export class PopupComponentComponent implements OnInit {
  @ViewChild(PopupContentsDirective, {static: true}) popContent: PopupContentsDirective;

  HeadingName:string;
  constructor(private componentFactoryResolver: ComponentFactoryResolver) { 
    this.HeadingName = "Test Popup";


  }

  ngOnInit() {
  }

  btn1Click(){
    let ddl:EcuTekDropDownListComponent = <EcuTekDropDownListComponent>this.loadComponent(EcuTekDropDownListComponent);;

    
  }

  btn2Click(){
    this.loadComponent(null);
  }

  loadComponent(component: Type<any>) : any{
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(component);

    const viewContainerRef = this.popContent.viewContainerRef;
    viewContainerRef.clear();

    const componentRef = viewContainerRef.createComponent(componentFactory);
    return componentRef.instance;
  }

}