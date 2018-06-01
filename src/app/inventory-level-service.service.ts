import { Injectable } from '@angular/core';

import { InventoryRecord, inventories } from './data-model';

@Injectable()
export class InventoryLevelService {

  constructor() { }

  getInventories(): Promise<InventoryRecord[]> {   // returns a Promise of type InventoryRecord array.
    return new Promise(resolve => {  // return a new promise, passing in a function that takes a resolve function to pass the data back.
        // Simulate server latency with a delay, do this eventually as an HTTP Get
        setTimeout(() => resolve(inventories), 500);
      });
  }

}
