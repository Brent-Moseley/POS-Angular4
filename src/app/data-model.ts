export class LineItem {
  product: number;
  description: string;
  qty = 1;
  percentOff: number;
}

export class Product {
  sku: number;
  name: string;
  desc: string;
  price: number;
  stock: number;
}

export const products: Product[] = [
  {
    sku: 101,
    name: 'Maxxis Aggressor mountain bike tire',
    desc: '29er 2.3 inch, TR, EXO',
    price: 45.55,
    stock: 32
  },
  {
    sku: 102,
    name: 'Race Face Chainring',
    desc: '45 tooth, for 1x11 systems',
    price: 67.11,
    stock: 19
  },
  {
    sku: 109,
    name: 'Bontrager mtn bike gloves',
    desc: 'size L, fingerless, gel pad',
    price: 36.00,
    stock: 4
  },
  {
    sku: 123,
    name: 'Bontrager mtn bike gloves',
    desc: 'size L, fingerless, gel pad',
    price: 36.00,
    stock: 4
  },
];


// Stackblitz project:  https://stackblitz.com/edit/angular-n7fm41?file=src%2Fapp%2Fhero-detail%2Fhero-detail.component.ts
// https://hackernoon.com/understanding-creating-and-subscribing-to-observables-in-angular-426dbf0b04a3
