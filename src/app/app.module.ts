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

import {CrisisListComponent} from './RountingComponents/CrisisListComponent/crisis-list.component';
import {HeroListComponent} from './RountingComponents/HeroListComponent/hero-list.component';

import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './RountingComponents/NotFoundComponent/not-found.component';


import { HttpClientModule } from '@angular/common/http';
import { DownloadFileService } from './HttpComponents/downloadfile.service';
import { ViewChildCompComponent } from './EcuTekComponents/ViewChildExample/view-child-comp/view-child-comp.component';
import { EcuTekBaseComponent } from './EcuTekComponents/EcuTekBase/ecutek-base.component';
import { PopupComponentComponent } from './EcuTekComponents/popup-component/popup-component.component';
import { PopupContentsDirective } from './EcuTekComponents/popup-contents.directive';
import { EcutekInputMaskComponent } from './EcuTekComponents/ecutek-input-mask/ecutek-input-mask.component';
import { MaskPipe } from './EcuTekComponents/mask.pipe';



const appRoutes: Routes = [
  { path: 'crisis-center', component: CrisisListComponent },
  { path: 'heroes-list', component: HeroListComponent }, 
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports:      [ BrowserModule, 
                  FormsModule,
                  RouterModule.forRoot(
                      appRoutes,
                      { enableTracing: true } // <-- debugging purposes only
                  ),
                  HttpClientModule

                ],
  declarations: [ AppComponent, TestComponent, EcuTekGridComponent, EcuTekFilterComponent, EcuTekMenuComponent, EcuTekDropDownListComponent, ExportComponent, CrisisListComponent, HeroListComponent, NotFoundComponent, ViewChildCompComponent, EcuTekBaseComponent, PopupComponentComponent, PopupContentsDirective, EcutekInputMaskComponent, MaskPipe ],
  bootstrap:    [ AppComponent ],
  providers: [DownloadFileService]
})
export class AppModule { }
