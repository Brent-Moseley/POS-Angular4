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
    if (typeof event.target != "undefined") this.orderToSearch = event.target.value;
  }

  search(pattern: string) {
    if (pattern.length == 0 || this.orderToSearch.length == 0) {
      this.modalService.setModalTitle('Cannot perform search:');
      this.modalService.setModalBody('Please enter a search string and select an order from the dropdown.');
      this.modalService.setButtons('OK', '');
      this.showModal('#modal-bp');
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
        next: line => {
          console.log('Search result line:');
          console.log(line); 
          this.searchResults.push(line); 
          lineCount++; 
        },
        error: err => { 
          console.log ('Error from search: '); 
          console.log(err); 
        },
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
      this.showModal('#modal-bp');
      this.subscription = this.modalService.modalResponseSource$.subscribe(
        response => {
          this.subscription.unsubscribe();  //  No longer want modal responses, so unsubscribe.
        }
      );      
    }
  }

  showModal(focus: string) {
    $('#messageModal').show();
    if (focus && focus.length > 0) setTimeout(function() {
      $(focus).focus();
    }, 100);  // wait for popup to active, then set focus on element desired, if given.
  }

}
