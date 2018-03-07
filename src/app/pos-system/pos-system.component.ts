import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';

import { Product, products, LineItem } from '../data-model';

@Component({
  selector: 'app-pos-system',
  templateUrl: './pos-system.component.html',
  styleUrls: ['./pos-system.component.css']
})
export class PosSystemComponent implements OnInit {

  posForm: FormGroup;
  order: LineItem[] = [];
  products = products;
  selectedProduct = null;

  constructor(private fb: FormBuilder) { 
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

  addItem(product, qty, percentOff) {
  	debugger;
    this.order.push({
    	product: 1, 
    	description: product.name + ' - ' + product.desc, 
    	qty: qty, 
    	percentOff: percentOff
    });
  }

}
