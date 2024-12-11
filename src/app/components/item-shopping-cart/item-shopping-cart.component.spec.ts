import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemShoppingCartComponent } from './item-shopping-cart.component';
import { SharedTestingModule } from 'src/app/shared-testing/shared-testing.module';
import { FormsModule } from '@angular/forms';

describe('ItemShoppingCartComponent', () => {
  let component: ItemShoppingCartComponent;
  let fixture: ComponentFixture<ItemShoppingCartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[SharedTestingModule,FormsModule],
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
