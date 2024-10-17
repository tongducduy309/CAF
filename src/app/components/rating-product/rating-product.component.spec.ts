import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RatingProductComponent } from './rating-product.component';

describe('RatingProductComponent', () => {
  let component: RatingProductComponent;
  let fixture: ComponentFixture<RatingProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RatingProductComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RatingProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
