export class LineItem {
  product: number;
  description: string;
  qty = 1;
  percentOff: number;
  lineItemTotal: number;   // see if there is a way to make this auto-calculated.
  totalSaved: number;
  sku: number;
}

export class Product {
  sku: number;
  name: string;
  desc: string;
  price: number;
  stock: number;
}

export class InventoryRecord {
  sku: number;
  stock: number;
}

export class Summary {
  totalItems:  number = 0;
  totalDiscount: number = 0.0;
  orderTotal: number = 0.0;
}

export const products: Product[] = [
  {
    sku: 101,
    name: 'Maxxis Aggressor mountain bike tire',
    desc: '29er 2.3 inch, TR, EXO',
    price: 45.55,
    stock: 0      // to be updated by inventory level service
  },
  {
    sku: 102,
    name: 'Race Face Chainring',
    desc: '45 tooth, for 1x11 systems',
    price: 67.11,
    stock: 0
  },
  {
    sku: 109,
    name: 'Bontrager mtn bike gloves',
    desc: 'size L, fingerless, gel pad',
    price: 36.00,
    stock: 0
  },
  {
    sku: 123,
    name: 'Pearl Izumi Bike Helmet',
    desc: 'size L, unisex, adjustable straps',
    price: 139.00,
    stock: 0
  },
  {
    sku: 219,
    name: 'Ducky PC keyboard',
    desc: '101 key, with number keypad, lighted keys, 3 color',
    price: 149.00,
    stock: 0
  },
  {
    sku: 265,
    name: 'Dell Monitor model 673GC',
    desc: '27 inch, 4K, IPS',
    price: 289.11,
    stock: 0
  },
  {
    sku: 244,
    name: 'Logitech wireless mouse M132',
    desc: 'Just a mouse',
    price: 19.00,
    stock: 0
  },
  {
    sku: 588,
    name: 'Google Pixel 2 XL',
    desc: '128 Gig memory, Verizon, 5.2 inch screen',
    price: 825.00,
    stock: 0
  }
];

export const inventories: InventoryRecord[] = [
  {
    sku: 101,
    stock: 32
  },
  {
    sku: 102,
    stock: 19
  },
  {
    sku: 109,
    stock: 4
  },
  {
    sku: 123,
    stock: 2
  },
  {
    sku: 219,
    stock: 8
  },
  {
    sku: 265,
    stock: 7
  },
  {
    sku: 244,
    stock: 14
  },
  {
    sku: 588,
    stock: 41
  }
];

// Stackblitz project:  https://stackblitz.com/edit/angular-n7fm41?file=src%2Fapp%2Fhero-detail%2Fhero-detail.component.ts
// https://hackernoon.com/understanding-creating-and-subscribing-to-observables-in-angular-426dbf0b04a3
