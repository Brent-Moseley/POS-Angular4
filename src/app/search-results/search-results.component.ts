import { Component, OnInit } from '@angular/core';
import { LineItem } from '../data-model';
import { StorageService } from '../storage-service.service';
import { ModalService } from '../modal-service.service';
import $ = require('jquery');


@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent implements OnInit {

  searchResults: LineItem[] = [];
  constructor(private storageService: StorageService, private modalService: ModalService) { }

  ngOnInit() {
  }

  search(pattern: string) {
    if (pattern.length == 0) {
      this.modalService.setModalTitle('Cannot perform search:');
      this.modalService.setModalBody('Please enter a search string');
      this.modalService.setButtons('OK', '');
      $('#messageModal').show();
        this.modalService.modalResponseSource$.subscribe(
          response => {
            console.log('modal reply: ' + response);
          }
        );      
    }
    else {
    	this.searchResults = [];
      let lineCount = 0;

    	// call the search method of the storage service, passing in an observer object to handle the results
    	this.storageService.search(pattern, {
    	  next: line => { console.log(line); this.searchResults.push(line); lineCount++; },
    	  complete: () => { console.log('Finished sequence');  this.checkSearchResults(lineCount); }
  	  });
    }
  }

  checkSearchResults (lineCount) {
    if (lineCount == 0) {
      this.modalService.setModalTitle('No Results:');
      this.modalService.setModalBody('No order lines were found matching your search string.');
      this.modalService.setButtons('OK', '');
      $('#messageModal').show();
        this.modalService.modalResponseSource$.subscribe(
          response => {
            console.log('modal reply: ' + response);
          }
        );      
    }
  }

}
