import { Component} from '@angular/core';

@Component({
  selector: 'ecutek-menu',
  templateUrl: './ecutek-menu.component.html',
  styleUrls: ['./ecutek-menu.component.css']
})

export class EcuTekMenuComponent{

}

class Menus{
  
}
class MenuItme
{
  ItemId:string;
  ItemText:string;
  ItemValue:any;
  IsActive:boolean;

  constructor(itemId:string, itmeText:string, itmeValue:any, isActive:boolean){
    this.ItemId = itemId;
    this.ItemText = itmeText;
    this.ItemValue = itmeValue;
    this.IsActive = isActive;
  }
}