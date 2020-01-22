import { Component} from '@angular/core';
import { DropDownListEventArgs } from ''

@Component({
  selector: 'ecutek-menu',
  templateUrl: './ecutek-menu.component.html',
  styleUrls: ['./ecutek-menu.component.css']
})

export class EcuTekMenuComponent{
  Menu:Menu;
  SelectedMenuSubmenus:Menu[];
  List:any[];

  constructor(){
    let menu:Menu = new Menu("001", -1, null, null);
    menu.AddMenuItem(new MenuItem("001", "BMW", 1, true));
    menu.AddMenuItem(new MenuItem("002", "Nissan", 2, false));
    menu.AddMenuItem(new MenuItem("003", "Toyota", 3, true));

    this.Menu = menu;

  let submenu:Menu = new Menu("001", 0, null, null);
    submenu.AddMenuItem(new MenuItem("001", "3 Series", 1, true));
    submenu.AddMenuItem(new MenuItem("002", "5 Series", 2, false));
    submenu.AddMenuItem(new MenuItem("003", "7 Series", 3, true));

    menu.AddSubmenu(submenu);
    // this.Menus = [];
    // this.Menus.push(menu);

    this.SelectedMenuSubmenus=[];

  }

  ItemMouseOver($event:MouseEvent){    

  }

  OnSelectedItemChange($event:DropDownListEventArgs){
    console.log("Outer Component Trigger Event");
  }

}

class Menu{
  MenuId:string;
  Items:MenuItem[];
  Submenus:Menu[];
  RootLevel:number;

  constructor(menuId:string, rootLevel:number, items:MenuItem[], submenus:Menu[]){
    this.MenuId = menuId;
    this.RootLevel = rootLevel;
    this.Items = (items == null) ? [] : items;
    this.Submenus = (submenus == null) ? [] : submenus;
  }

  AddMenuItem(menuItem:MenuItem){
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
class MenuItem
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