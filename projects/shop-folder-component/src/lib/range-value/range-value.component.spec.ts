import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RangeValueComponent } from './range-value.component';

describe('RangeValueComponent', () => {
  let component: RangeValueComponent;
  let fixture: ComponentFixture<RangeValueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RangeValueComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RangeValueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
