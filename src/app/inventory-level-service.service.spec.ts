import { TestBed, inject } from '@angular/core/testing';

import { InventoryLevelServiceService } from './inventory-level-service.service';

describe('InventoryLevelServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InventoryLevelServiceService]
    });
  });

  it('should be created', inject([InventoryLevelServiceService], (service: InventoryLevelServiceService) => {
    expect(service).toBeTruthy();
  }));
});
