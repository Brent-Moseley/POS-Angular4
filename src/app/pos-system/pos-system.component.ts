import { Component, OnInit, ViewContainerRef  } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

import { Product, products, LineItem, Summary, InventoryRecord } from '../data-model';
import { StorageService } from '../storage-service.service';
import { ModalService } from '../modal-service.service';
import { InventoryLevelService } from '../inventory-level-service.service';
import $ = require('jquery');

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
  loading: boolean = false;

  constructor(private fb: FormBuilder, private storageService: StorageService, private modalService: ModalService,
      private inventoryService: InventoryLevelService, public toastr: ToastsManager,
      vcr: ViewContainerRef) { 
    this.toastr.setRootViewContainerRef(vcr);
  	this.createForm();
    this.inventoryService.getInventories()
      .then(inv => {   // handle resolve of promise, passing in <InventoryRecord[]>.
        this.setStockLevels(inv);
      });

    let lnum = 0;
    storageService.searchResults.subscribe({
      next(line) { lnum++; console.log('Current Order line ' + lnum + ': ', line); },
      error(msg) { console.log('Error Getting Lines: ', msg); }
    });
  }

  setStockLevels(inv: InventoryRecord[]) {
    this.products.forEach(prod => {
      inv.forEach(line => {
        if (line.sku == prod.sku) prod.stock = line.stock;  // Set initial stock values from levels returned by service.
        // TODO:  no way to break from forEach, refactor to use for loop with break for performance increase.
      });
    });
  }

  createForm() {
    this.posForm = this.fb.group({
      quantity: '',
      product: ['', Validators.required],
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
    this.toastr.success('Order saved.', 'Success!');
    // Do some sort of notification here that order was saved. 
  }

  //getInventory

  load() {
    if (this.order.length > 0)  {
      this.modalService.setModalTitle('Warning!');
      this.modalService.setModalBody('Loading will wipe out your current order. Continue?');
      $('#messageModal').show();
        this.modalService.modalResponseSource$.subscribe(
          response => {
            console.log('modal reply: ' + response);
            if (response) this.loadAll();
          }
        );
    }
    else this.loadAll();
  }

  loadAll() {
    this.loading = true;
    this.storageService.getOrder()
      .then(order => {   // handle resolve of promise, passing in [<LineItem>].
        // reset stock quantities from Inventory Service, then subtract from quantities from all order lines.
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
        this.loading = false;
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
    this.toastr.success('Item added.', 'Success!');
  }

  search(val) {
    // Use observable to implement a search feature, find a line item, return in a separate results box, which is a new component.
    
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