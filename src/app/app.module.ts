import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';


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
    ReactiveFormsModule
  ],
  providers: [
  	StorageService,
  	InventoryLevelService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
