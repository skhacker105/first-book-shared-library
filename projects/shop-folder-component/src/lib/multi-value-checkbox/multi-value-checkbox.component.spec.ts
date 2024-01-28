import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiValueCheckboxComponent } from './multi-value-checkbox.component';

describe('MultiValueCheckboxComponent', () => {
  let component: MultiValueCheckboxComponent;
  let fixture: ComponentFixture<MultiValueCheckboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MultiValueCheckboxComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MultiValueCheckboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
