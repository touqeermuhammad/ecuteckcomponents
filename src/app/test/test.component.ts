import { Component, OnInit } from '@angular/core';
import { DownloadFileService } from '../HttpComponents/downloadfile.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { EcuTekMenuComponent, MenuItem,  MenuItemEventArgs } from '../EcuTekComponents/EcuTekMenu/ecutek-menu.component';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css'],
  providers: [HttpClient]
})
export class TestComponent implements OnInit {
  evilTitle = 'Template <script>alert("evil never sleeps")</script>Syntax';

  MenuList:MenuItem[];

  constructor(private service:DownloadFileService ) { 

  }

  ngOnInit() {
    this.MenuList = [];
    this.MenuList.push(new MenuItem("BMW", "1", true));
    this.MenuList.push(new MenuItem("Nissan", "2", false));
    this.MenuList.push(new MenuItem("Toyota", "3", true));

    this.MenuList[0].Children.push(new MenuItem("3 Series", "1.1", true));
    this.MenuList[0].Children.push(new MenuItem("5 Series", "1.2", true));
    this.MenuList[0].Children.push(new MenuItem("7 Series", "1.3", true));    

    this.MenuList[0].Children[0].Children.push(new MenuItem("Patrol", "1.1.1", true));    
    this.MenuList[0].Children[0].Children.push(new MenuItem("Diesel", "1.1.2", false));    

    this.MenuList[0].Children[0].Children[0].Children.push(new MenuItem("Patrol 1.9", "1.1.1.1", true));    
    this.MenuList[0].Children[0].Children[0].Children.push(new MenuItem("Patrol 2.0", "1.1.1.2", true));    
    this.MenuList[0].Children[0].Children[0].Children.push(new MenuItem("Patrol 2.5", "1.1.1.3", true));    

    this.MenuList[1].Children.push(new MenuItem("GTR", "2.1", true));
    this.MenuList[1].Children.push(new MenuItem("Micra", "2.2", true));

    this.MenuList[2].Children.push(new MenuItem("Corolla", "3.1", true));
    this.MenuList[2].Children.push(new MenuItem("Yaris", "3.2", true));



  }

  OnItemClicked($event:MenuItemEventArgs ){
    console.log("Outer Call");

    console.log($event.Item.ItemValue + " - " + $event.Item.ItemText);

  }

  public async DownloadFile($event:MouseEvent){

    const blob = await this.service.DownloadFile("http://localhost:51632/export/addresses?softGroup=S55&mapClass=1d");
    const url = window.URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = 'address.pascal';
    link.click();
  
    window.URL.revokeObjectURL(url);
  }

}