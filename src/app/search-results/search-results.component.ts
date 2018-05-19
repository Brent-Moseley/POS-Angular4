import { Component, OnInit } from '@angular/core';
import { LineItem } from '../data-model';
import { StorageService } from '../storage-service.service';
import { ModalService } from '../modal-service.service';
import { Subscription }   from 'rxjs/Subscription';
import $ = require('jquery');


@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent implements OnInit {

  searchResults: LineItem[] = [];
  searchResultsForOrder: string = '';
  subscription: Subscription;
  orderToSearch: string = '';

  constructor(private storageService: StorageService, private modalService: ModalService) { }

  ngOnInit() {
  }

  orderSelected(event) {
    //debugger;
    // TODO:  Do search across all orders.  For now, just a simple search demonstrating reusable components.
    this.orderToSearch = event.target.value;
    //this.search(this.currentOrder);
  }

  search(pattern: string) {
    if (pattern.length == 0 || this.orderToSearch.length == 0) {
      this.modalService.setModalTitle('Cannot perform search:');
      this.modalService.setModalBody('Please enter a search string and select an order from the dropdown.');
      this.modalService.setButtons('OK', '');
      $('#messageModal').show();
          this.subscription = this.modalService.modalResponseSource$.subscribe(
          response => {
            console.log('modal reply search pattern does not exist: ' + response);
            this.subscription.unsubscribe();  //  No longer want modal responses, so unsubscribe.
          }
        );      
    }
    else {
    	this.searchResults = [];
      let lineCount = 0;

    	// call the search method of the storage service, passing in an observer object to handle the results
    	this.storageService.search(pattern, this.orderToSearch, {
    	  next: line => { console.log(line); this.searchResults.push(line); lineCount++; },
    	  complete: () => { 
          console.log('Finished sequence of search results.');  
          this.checkSearchResults(lineCount); 
          this.searchResultsForOrder = this.orderToSearch;
        }
  	  });
    }
  }

  checkSearchResults (lineCount) {
    if (lineCount == 0) {
      this.modalService.setModalTitle('No Results:');
      this.modalService.setModalBody('No order lines were found matching your search string.');
      this.modalService.setButtons('OK', '');
      $('#messageModal').show();
        this.subscription = this.modalService.modalResponseSource$.subscribe(
          response => {
            console.log('modal reply no search results to show: ' + response);
            this.subscription.unsubscribe();  //  No longer want modal responses, so unsubscribe.
          }
        );      
    }
  }

}
