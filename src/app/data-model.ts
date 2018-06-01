/* Data-model.ts - type declarations for the app as well as app data (to be replaced by backend
    functionality in a future phase.)

*/

export class LineItem {     // order line item, contains one product with pricing
  product: number;
  description: string;
  qty = 1;
  percentOff: number;
  lineItemTotal: number;   // see if there is a way to make this auto-calculated.
  totalSaved: number;     // Total amount saved on this line item, to be used by summary
  sku: number;
  orderFrom: string;    // used in search results, to indicate the order this line item is from.
}

export class Product {    
  sku: number;
  name: string;
  desc: string;
  price: number;
  stock: number;
}

export class InventoryRecord {    // tracks available inventory level for a product
  sku: number;
  stock: number;
}

export class Summary {        // Summary block
  totalItems:  number = 0;
  totalDiscount: number = 0.0;
  orderTotal: number = 0.0;
}

// This will eventually come from the catalog service. 
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
    desc: '45 tooth, for 1x11 mountain bike systems',
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
    desc: 'Just a mouse, has buttons, you can click some',
    price: 19.00,
    stock: 0
  },
  {
    sku: 588,
    name: 'Google Pixel 2 XL Phone',
    desc: '128 Gig memory, Verizon, 5.2 inch screen',
    price: 825.00,
    stock: 0
  },
  {
    sku: 134,
    name: 'RockShox Shock pump',
    desc: 'High volume, 0 to 300 psi, pressure release valve',
    price: 37.98,
    stock: 0
  },
  {
    sku: 244,
    name: 'Stinger Waffles Cinnamon Apple',
    desc: 'pack of 16',
    price: 14.43,
    stock: 0
  },
  {
    sku: 733,
    name: 'Fox DPS Evolution Shock',
    desc: '2017 Factory, Kashima, 3 rebound settings',
    price: 297.00,
    stock: 0
  },
  {
    sku: 322,
    name: 'Miele Whole Bean Coffee System',
    desc: 'Cup sensor, water filtration, auto grind and rinsing',
    price: 3899.00,
    stock: 0
  },
  {
    sku: 244,
    name: 'Bakers Pride PX-14 Countertop Pizza Oven',
    desc: '20 inches wide, pull out crumb tray, 1500 watt',
    price: 525.00,
    stock: 0
  },
  {
    sku: 733,
    name: 'LG 86-inch LED Smart TV',
    desc: '4K resolution, 376 button remote, ThinQ AI, Dolby UltraMax Surround sound.',
    price: 3996.99,
    stock: 0
  },
  {
    sku: 322,
    name: 'Boomer & George Beacon Dog House',
    desc: 'With sunning side deck, 52L x 30W x 38H in., Fir wood construction with asphalt roofing',
    price: 3899.00,
    stock: 0
  }
];

export const inventories: InventoryRecord[] = [
  // Initial inventory levels, could be eventually tied to a specific location.
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
  },

  {
    sku: 134,
    stock: 16
  },
  {
    sku: 244,
    stock: 191
  },
  {
    sku: 733,
    stock: 9
  },
  {
    sku: 322,
    stock: 2
  },
  {
    sku: 244,
    stock: 8
  },
  {
    sku: 733,
    stock: 17
  },
  {
    sku: 322,
    stock: 26
  }  
];
