import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemInBillComponent } from './item-in-bill.component';
import { SharedTestingModule } from 'src/app/shared-testing/shared-testing.module';

describe('ItemInBillComponent', () => {
  let component: ItemInBillComponent;
  let fixture: ComponentFixture<ItemInBillComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[SharedTestingModule],
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
