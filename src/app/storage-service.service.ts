import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import { LineItem } from './data-model';

@Injectable()
export class StorageService {

  searchPattern: string = '';

  constructor() { }

  getOrder(): Promise<LineItem[]> {   // returns a Promise of type LineItem array.
    return new Promise(resolve => {
        // Simulate server latency with 1.5 second delay, do this eventually as an HTTP Get
        var data = JSON.parse(localStorage.getItem("POS2Order"));
        var set : LineItem[] = [];
        data.forEach( line => {
        	set.push(<LineItem>line);  // cast each generic object to a LineItem
        }); 
        setTimeout(() => resolve(set), 1500);
      });
  }

  saveOrder(order: LineItem[]): void {
    	localStorage.setItem("POS2Order", JSON.stringify(order));
  }

  search(pattern: string, observer) {
    // Set up a new search, saving the pattern and subscribing to the Observable with the new observer
    console.log('Now searching for: ' + pattern);
    this.searchPattern = pattern;
    this.searchResults.subscribe(observer);
  }

  // Observable pattern, use as an alternate way to get an order. 
  // Define the search results observable (of type LineItem), to return each discovered line item
  searchResults: Observable<LineItem> = new Observable((observer) => {
    var data = JSON.parse(localStorage.getItem("POS2Order"));
    data.forEach( line => {
      let li = <LineItem>line;   // cast each generic object to a LineItem
      if (li.description.indexOf(this.searchPattern) > -1) observer.next(<LineItem>line);  // if a match, call the next function of the observer with this line item
    }); 
    observer.complete();

    // When the consumer unsubscribes, clean up data ready for next subscription.
    return {unsubscribe() { this.searchPattern = ''; }};
  });
}

// http://choly.ca/post/typescript-json/
// http://cloudmark.github.io/Json-Mapping/
// https://angular.io/guide/observables
// 2851