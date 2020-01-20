import { Component} from '@angular/core';

@Component({
  selector: 'ecutek-menu',
  templateUrl: './ecutek-menu.component.html',
  styleUrls: ['./ecutek-menu.component.css']
})

export class EcuTekMenuComponent{
  Menus:Menu[];

  constructor(){
    let menu:Menu = new Menu("001", -1, null, null);
  }

}

class Menu{
  MenuId:string;
  Items:MenuItme[];
  Submenus:Menu[];
  RootLevel:number;

  constructor(menuId:string, rootLevel:number, items:MenuItme[], submenus:Menus[]){
    this.MenuId = menuId;
    this.RootLevel = rootLevel;
    this.Items = (items == null) ? [] : items;
    this.Submenus = (submenus == null) ? [] : submenus;
  }

  AddMenuItem(menuItem:MenuItme){
    this.Items.push(menuItem);
  }

  RemoveMenuItemById(itemId:string){
    let itemIndex = this.Items.findIndex(function(currentItem){
      return (currentItem.ItemId == itemId);
    });

    if(itemIndex == undefined || itemIndex == -1) return;
    this.RemoveMenuItemByIndex(itemIndex);
  }

  RemoveMenuItemByIndex(index:number){
    if(index < 0 &&  index >= this.Items.length) return;
    this.Items.splice(index, 0);
  }

  AddSubmenu(menu:Menu){
    this.Submenus.push(menu);
  }

  RemoveSuybmenuById(submenuId:string){
    let submenuIndex = this.Submenus.findIndex(function(currentItem){
      return (currentItem.MenuId == submenuId);
    });

    if(submenuIndex == undefined || submenuIndex == -1) return;
    this.RemoveMenuItemByIndex(submenuIndex);
  }

  RemoveSubmenuItemByIndex(index:number){
    if(index < 0 &&  index >= this.Items.length) return;
    this.Submenus.splice(index, 0);
  }
  
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