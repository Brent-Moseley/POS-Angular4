import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';

import { Product, products, LineItem } from '../data-model';
import { StorageService } from '../storage-service.service';

@Component({
  selector: 'app-pos-system',
  templateUrl: './pos-system.component.html',
  styleUrls: ['./pos-system.component.css']
})
export class PosSystemComponent implements OnInit {

  posForm: FormGroup;
  order: LineItem[] = [];
  private totalItems:  number = 0;
  private totalDiscount: number = 0.0;
  private orderTotal: number = 0.0;
  products = products;
  selectedProduct = null;

  constructor(private fb: FormBuilder, private storageService: StorageService) { 
  	this.createForm();
  }

  createForm() {
    this.posForm = this.fb.group({
      quantity: '',
      product: '',
      percent_off: ''
    });
  }

  ngOnInit() {
  }

  onSubmit() {
    this.storageService.saveOrder(this.order);
    // Do some sort of notification here that order was saved. 
  }

  load() {
    this.storageService.getOrder()
      .then(order => {
        this.order = order;
        this.calculateTotal();
      });  // handle resolve of promise, passing in [<LineItem>].
  }

  addItem(product, qty, percentOff) {
  	//debugger;
    this.order.push({
    	product: 1, 
    	description: product.name + ' - ' + product.desc, 
    	qty: qty, 
    	percentOff: percentOff,
    	lineItemTotal: product.price * qty * (1.0 - percentOff / 100),
        totalSaved: product.price * percentOff / 100 * qty
    });
    this.calculateTotal();
  }

  calculateTotal() {
      this.totalItems = 0;
      this.totalDiscount = 0.0;
      this.orderTotal = 0.0;
      this.order.forEach(item => {
        this.totalItems += +item.qty;
        this.orderTotal += item.lineItemTotal;
        this.totalDiscount += item.totalSaved;
      });
  }

}
