import { TestBed } from '@angular/core/testing';

import { ShopFolderStoreService } from './shop-folder-store.service';

describe('ShopFolderStoreService', () => {
  let service: ShopFolderStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShopFolderStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
