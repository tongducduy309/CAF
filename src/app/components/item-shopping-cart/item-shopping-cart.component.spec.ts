import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemShoppingCartComponent } from './item-shopping-cart.component';

describe('ItemShoppingCartComponent', () => {
  let component: ItemShoppingCartComponent;
  let fixture: ComponentFixture<ItemShoppingCartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemShoppingCartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItemShoppingCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
