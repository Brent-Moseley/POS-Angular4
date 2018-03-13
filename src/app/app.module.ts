import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { PosSystemComponent } from './pos-system/pos-system.component';
import { StorageService } from './storage-service.service';


@NgModule({
  declarations: [
    AppComponent,
    PosSystemComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule
  ],
  providers: [
  	StorageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
