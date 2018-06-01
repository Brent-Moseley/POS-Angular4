import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { StorageService } from '../storage-service.service';


@Component({
  selector: 'app-order-drop-down',
  templateUrl: './order-drop-down.component.html',
  styleUrls: ['./order-drop-down.component.css']
})
export class OrderDropDownComponent implements OnInit {

  orderList: string[];
  optionSelected: any;

  constructor(private storageService: StorageService) {
    storageService.getOrderList()
    .then(orders => {   // handle resolve of promise, passing in string[].
      this.orderList = orders;
    });
  }

  @Input() loading: boolean;
  @Input() showAll: boolean;
  @Output()
  change: EventEmitter<string> = new EventEmitter<string>();

  onOptionsSelected(event){
    console.log(event); //option value will be sent as event
    this.change.emit(event);
  }

  ngOnInit() {
  }

}
