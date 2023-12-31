import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopFolderStoreComponent } from './shop-folder-store.component';

describe('ShopFolderStoreComponent', () => {
  let component: ShopFolderStoreComponent;
  let fixture: ComponentFixture<ShopFolderStoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShopFolderStoreComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ShopFolderStoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
