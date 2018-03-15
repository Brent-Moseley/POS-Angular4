import { Injectable } from '@angular/core';

import { InventoryRecord, inventories } from './data-model';

@Injectable()
export class InventoryLevelService {

  constructor() { }

  getInventories(): Promise<InventoryRecord[]> {   // returns a Promise of type Airport array.
    return new Promise(resolve => {
        // Simulate server latency with 2 second delay, do this eventually as an HTTP Get
        setTimeout(() => resolve(inventories), 500);
      });
  }

}
