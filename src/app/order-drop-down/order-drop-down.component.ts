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
    //debugger;
    this.change.emit(event);
  }

  ngOnInit() {
  }

}

// https://toddmotto.com/component-events-event-emitter-output-angular-2
// https://stackoverflow.com/questions/46925014/how-to-bind-selected-value-to-dropdown-list-in-angular-4
// https://angular.io/guide/component-interaction

