import { Component, OnInit } from '@angular/core';
import { LineItem } from '../data-model';
import { StorageService } from '../storage-service.service';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent implements OnInit {

  searchResults: LineItem[] = [];
  constructor(private storageService: StorageService) { }

  ngOnInit() {
  }

  search(pattern: string) {
  	this.searchResults = [];

  	// call the search method of the storage service, passing in an observer object to handle the results
  	this.storageService.search(pattern, {
	  next: line => { console.log(line); this.searchResults.push(line);  },
	  complete: () => { console.log('Finished sequence'); }
	});
  }

}
