import {
  Component,
  Input,
  Output,
  EventEmitter,
  Injectable
} from "@angular/core";
import { EcuTekBaseComponent } from "../../EcuTekComponents/EcuTekBase/ecutek-base.component";

@Component({
  selector: "ecutek-menu",
  templateUrl: "./ecutek-menu.component.html",
  styleUrls: ["./ecutek-menu.component.css"]
})
export class EcuTekMenuComponent extends EcuTekBaseComponent {
  MenuList: MenuItem[];
  private static SelectedItem: MenuItem;

  @Input() IsSubMenuShow: boolean;
  @Output("OnItemClicked") ItemClicked = new EventEmitter<MenuItemEventArgs>();

  constructor() {
    super();
    this.MenuList = [];
    this.IsSubMenuShow = false;
  }

  @Input()
  set DataSource(items: MenuItem[]) {
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

  ItemMouseOver($event: MouseEvent) {
    //console.log("Inner Call - ItemMouseOver");

    let target = <HTMLElement>$event.target;
    if (target.attributes["itemid"] == undefined) return;

    let itemId = target.attributes["itemid"].value;
    let isActive: boolean =
      target.attributes["isactive"].value == "true" ? true : false;

    let menuItem: MenuItem = null;

    if (
      EcuTekMenuComponent.SelectedItem != null &&
      EcuTekMenuComponent.SelectedItem.ItemId == itemId
    ) {
      menuItem = EcuTekMenuComponent.SelectedItem;
      //console.log("Found - ItemMouseOver");

    } else {
      menuItem = this.MenuList.find(function(currentItem) {
        return currentItem.ItemId == itemId;
      });
      EcuTekMenuComponent.SelectedItem = menuItem;
    }

    if (menuItem !== null && menuItem !== undefined) {
      if (menuItem.Children.length > 0) {
        menuItem.ShowChildren = isActive;
      }
    }
  }

  ItemMouseLeave($event: MouseEvent) {
    //console.log("Inner Call - ItemMouseLeave");
    let target = <HTMLElement>$event.target;
    if (target.attributes["itemid"] == undefined) return;

    let itemId = target.attributes["itemid"].value;

    let menuItem: MenuItem = null;

    if (
      EcuTekMenuComponent.SelectedItem != null &&
      EcuTekMenuComponent.SelectedItem.ItemId == itemId
    ) {
      menuItem = EcuTekMenuComponent.SelectedItem;
      //console.log("Found - ItemMouseLeave");

    } else {
      menuItem = this.MenuList.find(function(currentItem) {
        return currentItem.ItemId == itemId;
      });
      EcuTekMenuComponent.SelectedItem = menuItem;
    }

    if (menuItem !== null && menuItem !== undefined) {
      if (menuItem.Children.length > 0) {
        menuItem.ShowChildren = false;
      }
    }
  }

  ItemClick($event: MouseEvent) {
    let target = <HTMLElement>$event.target;
    if (target.attributes["itemid"] == undefined) return;

    let itemId = target.attributes["itemid"].value;
    let isActive: boolean =
      target.attributes["isactive"].value == "true" ? true : false;

    if (!isActive) return;
    console.log("Inner Call" + itemId);

    // let menuItem: MenuItem = this.MenuList.find(function(currentItem) {
    //   return currentItem.ItemId == itemId;
    // });

    let args: MenuItemEventArgs = new MenuItemEventArgs(this, EcuTekMenuComponent.SelectedItem);
    this.ItemClicked.emit(args);
  }
}

export class MenuItem {
  ItemId: string;
  ItemText: string;
  ItemValue: any;
  IsActive: boolean;
  ImageURL: string;
  Children: MenuItem[];
  ShowChildren: boolean;

  constructor(itmeText: string, itmeValue: any, isActive: boolean) {
    this.ItemId = this.GUID();
    this.ItemText = itmeText;
    this.ItemValue = itmeValue;
    this.IsActive = isActive;
    this.Children = [];
    this.ShowChildren = false;
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

export class MenuItemEventArgs {
  Sender: EcuTekMenuComponent;
  Item: MenuItem;

  constructor(sender: EcuTekMenuComponent, item: MenuItem) {
    this.Sender = sender;
    this.Item = item;
  }
}
