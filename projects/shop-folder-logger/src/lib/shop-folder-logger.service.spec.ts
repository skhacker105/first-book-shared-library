import { TestBed } from '@angular/core/testing';

import { ShopFolderLoggerService } from './shop-folder-logger.service';

describe('ShopFolderLoggerService', () => {
  let service: ShopFolderLoggerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShopFolderLoggerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
