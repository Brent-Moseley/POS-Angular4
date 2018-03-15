import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';

import { Product, products, LineItem, Summary, InventoryRecord } from '../data-model';
import { StorageService } from '../storage-service.service';
import { InventoryLevelService } from '../inventory-level-service.service';

@Component({
  selector: 'app-pos-system',
  templateUrl: './pos-system.component.html',
  styleUrls: ['./pos-system.component.css']
})
export class PosSystemComponent implements OnInit {

  posForm: FormGroup;
  order: LineItem[] = [];
  summary: Summary = new Summary();
  products = products;
  defaultStock: number[] = [];
  selectedProduct = null;
  productMin: number = 1;
  productMax: number = 0;
  discountMax: number = 100;
  quantityError: boolean = false;
  discountError: boolean = false;

  constructor(private fb: FormBuilder, private storageService: StorageService, 
      private inventoryService: InventoryLevelService) { 
  	this.createForm();
    this.inventoryService.getInventories()
      .then(inv => {   // handle resolve of promise, passing in <InventoryRecord[]>.
        this.setStockLevels(inv);
        // this.products.forEach(prod => {
        //   inv.forEach(line => {
        //     if (line.sku == prod.sku) prod.stock = line.stock;  // Set initial stock values from levels returned by service.
        //   });
        // });
    });
  }

  setStockLevels(inv: InventoryRecord[]) {
    this.products.forEach(prod => {
      inv.forEach(line => {
        if (line.sku == prod.sku) prod.stock = line.stock;  // Set initial stock values from levels returned by service.
      });
    });
  }

  createForm() {
    this.posForm = this.fb.group({
      quantity: '',
      product: '',
      percent_off: '0'
    });
  }

  ngOnInit() {
  }

  productSelected() {
    this.productMax = this.posForm.value.product.stock;
  }

  quantityUpdated(qty) {
    if (qty > this.productMax || qty < this.productMin) this.quantityError = true;
    else this.quantityError = false;
  }

  discountUpdated(discount) {
    if (discount > this.discountMax || discount < 0) this.discountError = true;
    else this.discountError = false;
  }

  onSubmit() {
    this.storageService.saveOrder(this.order);
    // Do some sort of notification here that order was saved. 
  }

  getInventory

  load() {
    this.storageService.getOrder()
      .then(order => {   // handle resolve of promise, passing in [<LineItem>].
        // reset stock quantities from defaults, then subtract all orders
        this.inventoryService.getInventories()
          .then(inv => {   // handle resolve of promise, passing in <InventoryRecord[]>.
            this.setStockLevels(inv);
            this.products.forEach((prod) => {
              order.forEach(line => {
                if (line.sku == prod.sku) prod.stock -= line.qty;  // Reduce stock based on order line.
              });
            });
          });

        this.order = order;
        this.calculateTotal();
        this.selectedProduct = this.products[0];
        this.productMax = this.products[0].stock;
        this.posForm.setValue({percent_off: 0, quantity: 0, product: this.products[0]});
      }); 
  }

  addItem(product, qty, percentOff) {
    // double check quantity one more time before adding.
    this.quantityUpdated(qty);
    this.discountUpdated(percentOff);
    if (this.discountError == true || this.quantityError == true) return;
    this.order.push({
    	product: 1, 
      sku: product.sku,
    	description: product.name + ' - ' + product.desc, 
    	qty: qty, 
    	percentOff: percentOff,
    	lineItemTotal: product.price * qty * (1.0 - percentOff / 100),
        totalSaved: product.price * percentOff / 100 * qty
    });
    this.productMax -= qty;
    product.stock -= qty;
    this.calculateTotal();
  }

  calculateTotal() {
      var totalItems = 0;
      var totalDiscount = 0.0;
      var orderTotal = 0.0;
      this.order.forEach(item => {
        totalItems += +item.qty;
        orderTotal += item.lineItemTotal;
        totalDiscount += item.totalSaved;
      });

      this.summary.totalItems = totalItems;
      this.summary.totalDiscount = totalDiscount;
      this.summary.orderTotal = orderTotal;
  }

}


// https://angular.io/guide/component-interaction