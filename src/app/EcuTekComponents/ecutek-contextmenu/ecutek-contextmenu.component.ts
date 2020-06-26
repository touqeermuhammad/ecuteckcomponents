import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ecutek-contextmenu',
  templateUrl: './ecutek-contextmenu.component.html',
  styleUrls: ['./ecutek-contextmenu.component.css']
})
export class EcutekContextmenuComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}

export class MenuItem {
  itemId: string;
  itemText: string;
  itemValue: any;
  isActive: boolean;
  imageURL: string;
  children: MenuItem[];
  showChildren: boolean;

  constructor(itmeText: string, itmeValue: any, isActive: boolean) {
    this.itemId = this.GUID();
    this.itemText = itmeText;
    this.itemValue = itmeValue;
    this.isActive = isActive;
    this.children = [];
    this.showChildren = false;
  }

  private GUID(): any {
    var dt = new Date().getTime();
    var uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(
      c
    ) {
      var r = (dt + Math.random() * 16) % 16 | 0;
      dt = Math.floor(dt / 16);
      return (c == "x" ? r : (r & 0x3) | 0x8).toString(16);
    });
    return uuid;
  }

  addChild(menuItem: MenuItem) {
    this.children.push(menuItem);
  }

  removeChildItemById(itemId: string) {
    let itemIndex = this.children.findIndex(function(currentItem) {
      return currentItem.itemId == itemId;
    });

    if (itemIndex == undefined || itemIndex == -1) return;
    this.removeChildItemByIndex(itemIndex);
  }

  R
  removeChildItemByIndex(index: number) {
    if (index < 0 && index >= this.children.length) return;
    this.children.splice(index, 0);
  }
}

export class EcutekContextmenuEventArgs {
  sender: EcutekContextmenuComponent;
  item: MenuItem;

  constructor(sender: EcutekContextmenuComponent, item: MenuItem) {
    this.sender = sender;
    this.item = item;
  }
}
