import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { TestComponent } from './test/test.component';
import { EcuTekGridComponent } from './EcuTekComponents/EcuTekGrid/ecutek-grid.component';
import { EcuTekFilterComponent } from './EcuTekComponents/EcuTekFilter/ecutek-filter.component';
import { EcuTekMenuComponent } from './EcuTekComponents/EcuTekMenu/ecutek-menu.component';

import { EcuTekDropDownListComponent } from './EcuTekComponents/EcuTekDropDownList/ecutek-dropdownlist.component';

import {ExportComponent} from './ExportComponent/export.component'

@NgModule({
  imports:      [ BrowserModule, FormsModule ],
  declarations: [ AppComponent, TestComponent, EcuTekGridComponent, EcuTekFilterComponent, EcuTekMenuComponent, EcuTekDropDownListComponent, ExportComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
