import { TestBed } from '@angular/core/testing';

import { ShopFolderComponentService } from './shop-folder-component.service';

describe('ShopFolderComponentService', () => {
  let service: ShopFolderComponentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShopFolderComponentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
