import { Component, OnInit, Input } from '@angular/core';
import { LineItem, Summary } from '../data-model';

@Component({
  selector: 'app-order-summary',
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.css']
})
export class OrderSummaryComponent implements OnInit {

  @Input('order') order: LineItem[];
  @Input('summary') summary: Summary;
  constructor() { }

  ngOnInit() {
  }

  ngOnChanges() {
  	console.log('Change to an input property of OrderSummaryComponent:');
  	console.log('    data is ', this.order, ' ', this.summary);
  }

}
