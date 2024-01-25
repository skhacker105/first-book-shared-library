import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterLayoutComponent } from './filter-layout.component';

describe('FilterLayoutComponent', () => {
  let component: FilterLayoutComponent;
  let fixture: ComponentFixture<FilterLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilterLayoutComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FilterLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
