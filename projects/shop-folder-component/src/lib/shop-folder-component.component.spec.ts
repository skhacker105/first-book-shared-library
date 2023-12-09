import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopFolderComponentComponent } from './shop-folder-component.component';

describe('ShopFolderComponentComponent', () => {
  let component: ShopFolderComponentComponent;
  let fixture: ComponentFixture<ShopFolderComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShopFolderComponentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ShopFolderComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
