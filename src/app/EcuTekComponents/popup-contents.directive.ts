import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[popup-contents]'
})
export class PopupContentsDirective {

  constructor(public viewContainerRef: ViewContainerRef) { }

}