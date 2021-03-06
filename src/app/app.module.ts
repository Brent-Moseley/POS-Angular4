import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ToastModule } from 'ng2-toastr/ng2-toastr';

import { AppComponent } from './app.component';
import { PosSystemComponent } from './pos-system/pos-system.component';
import { StorageService } from './storage-service.service';
import { ModalService } from './modal-service.service';
import { InventoryLevelService } from './inventory-level-service.service';
import { OrderSummaryComponent } from './order-summary/order-summary.component';
import { SearchResultsComponent } from './search-results/search-results.component';
import { ModalComponent } from './modal/modal.component';
import { OrderDropDownComponent } from './order-drop-down/order-drop-down.component';
import { TruncatePipe } from './truncate.pipe';
import { ShowPercentPipe } from './show-percent.pipe';


@NgModule({
  declarations: [     // New components in this app go into declarations
    AppComponent,
    PosSystemComponent,
    OrderSummaryComponent,
    SearchResultsComponent,
    ModalComponent,
    OrderDropDownComponent,
    TruncatePipe,
    ShowPercentPipe
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule, 
    ToastModule.forRoot(),    // create as a singleton service and allow to be shared among all modules (eagerly loaded and lazily loaded)
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [    // Services created in this app get registered as providers.
  	StorageService,
  	InventoryLevelService,
    ModalService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
