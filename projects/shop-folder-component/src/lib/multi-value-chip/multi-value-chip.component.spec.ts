import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiValueChipComponent } from './multi-value-chip.component';

describe('MultiValueChipComponent', () => {
  let component: MultiValueChipComponent;
  let fixture: ComponentFixture<MultiValueChipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MultiValueChipComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MultiValueChipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
