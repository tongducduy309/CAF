import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemInBillComponent } from './item-in-bill.component';

describe('ItemInBillComponent', () => {
  let component: ItemInBillComponent;
  let fixture: ComponentFixture<ItemInBillComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemInBillComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItemInBillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
