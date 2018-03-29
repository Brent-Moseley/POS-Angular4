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
  	this.storageService.search(pattern, {
	  next(line: LineItem) { console.log(line); },
	  complete() { console.log('Finished sequence'); }
	});
  }

}
