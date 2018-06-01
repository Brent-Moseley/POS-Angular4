import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import { LineItem } from './data-model';

@Injectable()
export class StorageService {

  searchPattern: string = '';
  searchOrder: string = '';
  orderList: string[];

  constructor() {
    this.orderList = JSON.parse(localStorage.getItem("orders"));
  }

  getOrder(id: string): Promise<LineItem[]> {   // returns a Promise of type LineItem array.
    console.log('Getting order: ' + id);
    return new Promise(resolve => {
      try {
          var data = JSON.parse(localStorage.getItem("POS2Order" + id));
          var set : LineItem[] = [];
          if (data === null) throw "Unable to load order!";
          data.forEach( line => {
            set.push(<LineItem>line);  // cast each generic object to a LineItem
          }); 
        }
        catch (e) {
          // error handling for now, add some kind of return message to this...
          console.log('Load error.');
          console.log(e);
        }       
        setTimeout(() => resolve(set), 750);  // Simulate server latency with 0.75 second delay, do this eventually as an HTTP Get
      });
  }

  getOrderList(): Promise<string[]> {
    return new Promise(resolve => {
      setTimeout(() => resolve(this.orderList), 500);
    });
  }

  saveOrder(order: LineItem[], id: string): void {
    console.log('Saving order: ' + id);
    debugger;
    try {
      if (this.orderList.findIndex(function (e) {return e === id;}) == -1) {
        // This is a new order, add to the list
        console.log('(new order)');
        this.orderList.push(id);
        console.log('New list is:');
        console.log(this.orderList);
        localStorage.setItem("orders", JSON.stringify(this.orderList));
      }
      localStorage.setItem("POS2Order" + id, JSON.stringify(order));
    }
    catch (e) {
      // error handling for now, add some kind of return message to this...
      console.log('Save error, possible storage full.');
      console.log(e);
    }
  }

  removeOrder(name: string) {
    localStorage.removeItem("POS2Order" + name);
    var index = this.orderList.indexOf(name);
    if (index > -1) {
      this.orderList.splice(index, 1);
      localStorage.setItem("orders", JSON.stringify(this.orderList));
    }
  }

  search(pattern: string, order: string, observer) {
    // Set up a new search, saving the pattern and subscribing to the Observable with the new observer
    console.log('Now searching for: ' + pattern + ' on order: ' + order);
    this.searchPattern = pattern;
    this.searchOrder = order;
    if (order == 'All' ) this.searchResultsAll.subscribe(observer);
    else this.searchResults.subscribe(observer);
  }

  // Observable pattern, use as an alternate way to get an order. 
  // Define the search results observable (of type LineItem), to return each discovered line item
  searchResults: Observable<LineItem> = new Observable((observer) => {
    var data = JSON.parse(localStorage.getItem("POS2Order" + this.searchOrder));
    if (!data) {
      observer.error("Order not found.");
    }
    else {
      var pattern = this.searchPattern.toLowerCase();
      data.forEach( line => {
        let li = <LineItem>line;   // cast each generic object to a LineItem
        let test = line.description.toLowerCase();
        if (test.indexOf(pattern) > -1) observer.next(li);  // if a match, call the next function of the observer with this line item
      }); 
    }
    observer.complete();

    // When the consumer unsubscribes, clean up data ready for next subscription.
    return {unsubscribe() { this.searchPattern = ''; }};
  });

  searchResultsAll: Observable<LineItem> = new Observable((observer) => {
    var pattern = this.searchPattern.toLowerCase();
    this.orderList.forEach( order => {
      var data = JSON.parse(localStorage.getItem("POS2Order" + order));
      data.forEach( line => {
        let li = <LineItem>line;   // cast each generic object to a LineItem
        let test = line.description.toLowerCase();
        if (!li.orderFrom) li.orderFrom = order;    // patch for old data.
        if (test.indexOf(pattern) > -1) observer.next(li);  // if a match, call the next function of the observer with this line item
      }); 
    });
    observer.complete(); 
  
    // When the consumer unsubscribes, clean up data ready for next subscription.
    return {unsubscribe() { this.searchPattern = ''; }};
  });

}

/*
  TODO: Update to include an order dropdown with a list of orders - This will be based on an order number (auto-generated),
  and a name field.  In the search component, include this dropdown of where to search from. When switching orders, have a 
  modal prompt to save if needed. Add a create new button. 
  TODO:  Also add line item delete.  
*/
// http://choly.ca/post/typescript-json/
// http://cloudmark.github.io/Json-Mapping/
// https://angular.io/guide/observables
// 2851
// https://x-team.com/blog/rxjs-observables/ 