import { Component, Input } from "@angular/core";

@Component({
  selector: "ecutek-menu",
  templateUrl: "./ecutek-menu.component.html",
  styleUrls: ["./ecutek-menu.component.css"]
})
export class EcuTekMenuComponent {
  MenuList: MenuItem[];

  constructor() {
    this.MenuList = [];
    // let menu: Menu = new Menu(-1, null, null);
    // menu.AddMenuItem(new MenuItem("BMW", 1, true));
    // menu.AddMenuItem(new MenuItem("Nissan", 2, false));
    // menu.AddMenuItem(new MenuItem("Toyota", 3, true));
    // menu.Items[0].AddChild(new MenuItem("3 Series", 1.1, true));
    // menu.Items[0].AddChild(new MenuItem("5 Series", 1.2, true));
    // menu.Items[0].AddChild(new MenuItem("7 Series", 1.3, true));
    // this.Menu = menu;
  }

  @Input()
  DataSource(items: MenuItem[]) {
    this.BuildMenu(items);
  }

  private BuildMenu(items: MenuItem[]) {
    this.MenuList = [];

    for (let x of items) {
      let menuItem: MenuItem = new MenuItem(
        x.ItemText,
        x.ItemValue,
        x.IsActive
      );
      this.MenuList.push(menuItem);

      if (x.Children.length > 0) {
        this.AddChildren(x.Children, menuItem);
      }
    }
  }

  private AddChildren(children: MenuItem[], parent: MenuItem) {
    for (let x of children) {
      let menuItem: MenuItem = new MenuItem(
        x.ItemText,
        x.ItemValue,
        x.IsActive
      );
      parent.Children.push(menuItem);

      if (x.Children.length > 0) {
        this.AddChildren(x.Children, menuItem);
      }
    }
  }

  ItemMouseOver($event: MouseEvent) {}
}

// class Menu {
//   MenuId: string;
//   Items: MenuItem[];

//   constructor(rootLevel: number, items: MenuItem[], submenus: Menu[]) {
//     this.MenuId = this.GUID();
//     this.Items = items == null ? [] : items;
//   }

//   private GUID(): any {
//     var dt = new Date().getTime();
//     var uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(
//       c
//     ) {
//       var r = (dt + Math.random() * 16) % 16 | 0;
//       dt = Math.floor(dt / 16);
//       return (c == "x" ? r : (r & 0x3) | 0x8).toString(16);
//     });
//     return uuid;
//   }

//   AddMenuItem(menuItem: MenuItem) {
//     this.Items.push(menuItem);
//   }

//   RemoveMenuItemById(itemId: string) {
//     let itemIndex = this.Items.findIndex(function(currentItem) {
//       return currentItem.ItemId == itemId;
//     });

//     if (itemIndex == undefined || itemIndex == -1) return;
//     this.RemoveMenuItemByIndex(itemIndex);
//   }

//   RemoveMenuItemByIndex(index: number) {
//     if (index < 0 && index >= this.Items.length) return;
//     this.Items.splice(index, 0);
//   }
// }

class MenuItem {
  ItemId: string;
  ItemText: string;
  ItemValue: any;
  IsActive: boolean;
  Children: MenuItem[];

  constructor(itmeText: string, itmeValue: any, isActive: boolean) {
    this.ItemId = this.GUID();
    this.ItemText = itmeText;
    this.ItemValue = itmeValue;
    this.IsActive = isActive;
    this.Children = [];
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

  AddChild(menuItem: MenuItem) {
    this.Children.push(menuItem);
  }

  RemoveChildItemById(itemId: string) {
    let itemIndex = this.Children.findIndex(function(currentItem) {
      return currentItem.ItemId == itemId;
    });

    if (itemIndex == undefined || itemIndex == -1) return;
    this.RemoveChildItemByIndex(itemIndex);
  }

  RemoveChildItemByIndex(index: number) {
    if (index < 0 && index >= this.Children.length) return;
    this.Children.splice(index, 0);
  }
}
