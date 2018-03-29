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

  search(pattern: string, observer): Observable<LineItem> {
    this.searchPattern = pattern;
    return this.searchResults;
  }

  // Observable pattern, use as an alternate way to get an order. 
  searchResults: Observable<LineItem> = new Observable((observer) => {
    // Get the next and error callbacks. These will be passed in when
    // the consumer subscribes.
    //const {next, error} = observer;

    var data = JSON.parse(localStorage.getItem("POS2Order"));
    data.forEach( line => {
      observer.next(<LineItem>line);  // cast each generic object to a LineItem
    }); 

    // When the consumer unsubscribes, clean up data ready for next subscription.
    return {unsubscribe() { }};
  });
}

// http://choly.ca/post/typescript-json/
// http://cloudmark.github.io/Json-Mapping/
// https://angular.io/guide/observables
// 2851