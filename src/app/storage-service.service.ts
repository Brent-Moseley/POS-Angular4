import { Injectable } from '@angular/core';

import { LineItem } from './data-model';

@Injectable()
export class StorageService {

  constructor() { }

  getOrder(): Promise<LineItem[]> {   // returns a Promise of type Airport array.
    return new Promise(resolve => {
        // Simulate server latency with 2 second delay, do this eventually as an HTTP Get
        var data = JSON.parse(localStorage.getItem("POS2Order"));
        var set : LineItem[] = [];
        data.forEach( line => {
        	set.push(<LineItem>line);
        }); 
        setTimeout(() => resolve(set), 1500);
      });
  }

    saveOrder(order: LineItem[]): void {   // returns a Promise of type Airport array.
    	localStorage.setItem("POS2Order", JSON.stringify(order));
  }
}

// http://choly.ca/post/typescript-json/
// http://cloudmark.github.io/Json-Mapping/
// 2851