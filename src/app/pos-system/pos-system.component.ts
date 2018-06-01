// Main UI component

import { Component, OnInit, ViewContainerRef  } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';   // Reactive forms
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

import { Product, products, LineItem, Summary, InventoryRecord } from '../data-model';
import { StorageService } from '../storage-service.service';
import { ModalService } from '../modal-service.service';
import { InventoryLevelService } from '../inventory-level-service.service';
import { Subscription }   from 'rxjs/Subscription';
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
  edits: boolean = false;
  allowAdd: boolean = false;
  subscription: Subscription;     // save the subscription
  currentOrder: string = "None";

  constructor(private fb: FormBuilder, private storageService: StorageService, private modalService: ModalService,
      private inventoryService: InventoryLevelService, public toastr: ToastsManager,
      vcr: ViewContainerRef) { 
    this.toastr.setRootViewContainerRef(vcr);
  	this.createForm();          // set up reactive form
    this.inventoryService.getInventories()
      .then(inv => {   // handle resolve of promise, passing in <InventoryRecord[]>. Alternate to using observable.
        this.setStockLevels(inv);
      });

    // Sample of using observable to get search results / all lines.
    let lnum = 0;

    storageService.search("", "POS2Order", {
      next(line) { lnum++; console.log('Current Order line ' + lnum + ': ', line); },
      error(msg) { console.log('Error Getting order: ', msg); }
    });      
    // End sample
  }

  orderUpdated(event) {
    if (typeof event.target != "undefined") this.currentOrder = event.target.value;
    this.load(this.currentOrder);
  }

  setStockLevels(inv: InventoryRecord[]) {
    this.products.forEach(prod => {
      inv.forEach(line => {
        if (line.sku == prod.sku) { 
          prod.stock = line.stock;  
        } // Set initial stock values from levels returned by service.
        // TODO:  no way to break from forEach, refactor to use for loop with break for performance increase.
      });
    });
  }

  createForm() {
    // Create form with default values.
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
    this.storageService.saveOrder(this.order, this.currentOrder);
    this.edits = false;
    this.toastr.success('Order saved.', 'Success!');
  }


  newOrder() {
    if (this.edits) {
      this.modalService.setModalTitle('Create New Order');
      this.modalService.setModalBody('Current order has not been saved. Continuing with a new order' + 
        ' will lose any updates you have made since last saving. Please save current order and try again.');
        this.modalService.setButtons('OK', '');
      $('#messageModal').show();
      this.subscription = this.modalService.modalResponseSource$.subscribe(
        response => {
          this.subscription.unsubscribe();  //  No longer want modal responses, so unsubscribe.
          this.modalService.setModalShowInput(false);   // Make sure to reset this, maybe a better way to do this.
        });
    }
    else this.createNewOrder();
  }

  createNewOrder() {
    this.modalService.setModalTitle('Create New Order');
    this.modalService.setModalBody('Enter a name for the new order:');  // TODO:  Check this.edits before doing this.
    this.modalService.setModalShowInput(true);
    this.modalService.setButtons('Continue', 'Cancel');
    $('#messageModal').show();
    this.subscription = this.modalService.modalResponseSource$.subscribe(
      response => {
        this.subscription.unsubscribe();  //  No longer want modal responses, so unsubscribe.
        this.modalService.setModalShowInput(false);   // Make sure to reset this, maybe a better way to do this.
        if (response) {
          // Make sure new order name does not already exist
          this.storageService.getOrderList()
          .then(orders => {   // handle resolve of promise, passing in string[].
            if (orders.find(function(elem) { return elem == response; })) {
              this.toastr.error('Order already exists!  Please try a different name.');
            }
            else this.finalCreateOrder(response);
          });
        }
      }
    );
  }

  finalCreateOrder(name) {
    this.order = [];
    this.currentOrder = name;
    this.edits = false;
    this.inventoryService.getInventories()
      .then(inv => {   // handle resolve of promise, passing in <InventoryRecord[]>. Alternate to using observable.
        this.setStockLevels(inv);
        this.allowAdd = true;
        this.toastr.success('New order created.', 'Success!');          
      });
  }


  remove(currentOrder)  {
    this.modalService.setModalTitle('Delete Current Order');
    this.modalService.setModalBody('Really delete current order from the system?  You cannot undo this.');
    this.modalService.setButtons('Yes', 'Cancel');
    $('#messageModal').show();
    this.subscription = this.modalService.modalResponseSource$.subscribe(
      response => {
        this.subscription.unsubscribe();  //  No longer want modal responses, so unsubscribe.
        this.modalService.setModalShowInput(false);   // Make sure to reset this, maybe a better way to do this.
        if (response) {
          debugger;
          this.order = [];
          this.edits = false;
          this.allowAdd = false;
          this.storageService.removeOrder(this.currentOrder);
          this.currentOrder = 'None';   // on initial state, perhaps disable add Item button until they load or start a new order.
          this.inventoryService.getInventories()
            .then(inv => {   // handle resolve of promise, passing in <InventoryRecord[]>. Alternate to using observable.
              this.setStockLevels(inv);
              this.toastr.success('Order deleted from the system. Adios!!', 'Success!');          
            });
        }
      }
    );

  }

  //getInventory
  load(order: string) {
    console.log("Now loading order: " + order);
    if (this.edits)  {
      this.modalService.setModalTitle('Warning!');
      this.modalService.setModalBody('Loading will wipe out your unsaved changes to this order. Continue?');
      this.modalService.setButtons('Continue', 'Cancel');
      $('#messageModal').show();
      this.subscription = this.modalService.modalResponseSource$.subscribe(
        response => {
          this.subscription.unsubscribe();  //  No longer want modal responses, so unsubscribe.
          if (response) this.loadAll(order);
        }
      );
    }
    else this.loadAll(order);
  }

  loadAll(orderName: string) {
    this.loading = true;
    this.edits = false;
    this.storageService.getOrder(orderName)
      .then(order => {   // handle resolve of promise, passing in [<LineItem>].
        // reset stock quantities from Inventory Service, then subtract from quantities from all order lines.
        // TODO:  move this logic to a service, this is the kind of logic a service should be doing, UI just gets
        // the order as well as the updated stock.  Update this when creating a catalog service.
        this.inventoryService.getInventories()
          .then(inv => {   // handle resolve of promise, passing in <InventoryRecord[]>.  Update to observable later.
            this.setStockLevels(inv);
            this.products.forEach((prod) => {
              order.forEach(line => {
                if (line.sku == prod.sku) {
                  prod.stock -= line.qty;  // Reduce stock levels based on order line.
                }
              });
            });
            this.order = order;
            this.calculateTotal();
            this.selectedProduct = this.products[0];
            this.productMax = this.products[0].stock;
            this.posForm.setValue({percent_off: 0, quantity: 0, product: this.products[0]});  // reset form values
            this.loading = false;
            this.currentOrder = orderName;
            this.edits = false; 
            this.allowAdd = true; 
          });
      }); 
  }

  addItem(product, qty, percentOff) {
    // double check quantity one more time before adding.  Blur event should handle this, but just in case they click add with focus still on input.
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
      totalSaved: product.price * percentOff / 100 * qty,
      orderFrom: this.currentOrder
    });
    this.edits = true;
    this.productMax -= qty;
    product.stock -= qty;
    this.calculateTotal();
    this.toastr.success('Item added.', 'Success!');
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
// https://www.typescriptlang.org/docs/handbook/classes.html
// https://hackernoon.com/best-practices-learnt-from-delivering-a-quality-angular4-application-2cd074ea53b3
// Confirm good design practices:  do my components only have logic related to the view?  Are data structural / processing tasks left
// to the services?
// How to make better use of interfaces?  Extending classes?  Static properties?  Interfaces?
// Test for responsiveness.
// Add some TDD.
// Make 508 compliant
// Create product catalog service.
// Create Express backend.
//
// MISSION
// Create good-looking, fun to use, highly functional web apps.  Make them dynamic and highly interactive in ways that convey
// understanding, usefulness, and innovation.  Make the UI clean, well-organized and helpful to the user as well as 
// adaptable to different kinds of users. Use good software design patterns and concepts such as efficiency, DRY, elegant
// and robust solutions. 
// Absorb, get immersed in the coding and design, code is gold! 