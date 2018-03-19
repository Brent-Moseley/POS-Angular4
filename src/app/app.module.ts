import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import {MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';


import { AppComponent } from './app.component';
import { PosSystemComponent } from './pos-system/pos-system.component';
import { StorageService } from './storage-service.service';
import { InventoryLevelService } from './inventory-level-service.service';
import { OrderSummaryComponent } from './order-summary/order-summary.component';


@NgModule({
  declarations: [
    AppComponent,
    PosSystemComponent,
    OrderSummaryComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    MatTableModule,
    MatInputModule,
    MatSelectModule,
    MatCardModule,
    MatButtonModule
  ],
  providers: [
  	StorageService,
  	InventoryLevelService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

// https://material.angular.io/components/table/api
// https://material.angular.io/components/input/overview
// https://material.angular.io/components/select/overview
// https://material.angular.io/components/card/overview
// https://material.angular.io/components/button/overview
// My theme: https://codepen.io/anon/pen/vRgyzj 