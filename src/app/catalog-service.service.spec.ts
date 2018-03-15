import { TestBed, inject } from '@angular/core/testing';

import { CatalogServiceService } from './catalog-service.service';

describe('CatalogServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CatalogServiceService]
    });
  });

  it('should be created', inject([CatalogServiceService], (service: CatalogServiceService) => {
    expect(service).toBeTruthy();
  }));
});
