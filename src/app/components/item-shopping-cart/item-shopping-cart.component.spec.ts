import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemShoppingCartComponent } from './item-shopping-cart.component';
import { SharedTestingModule } from 'src/app/shared-testing/shared-testing.module';
import { FormsModule } from '@angular/forms';
import { EventEmitter } from '@angular/core';
import { CrudService } from 'src/services/crud.service';

describe('ItemShoppingCartComponent', () => {
  let component: ItemShoppingCartComponent;
  let fixture: ComponentFixture<ItemShoppingCartComponent>;
  let crudService:any
  // const mockCrudService = jasmine.createSpyObj('CrudService', ['put']);
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[SharedTestingModule,FormsModule],
      declarations: [ ItemShoppingCartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItemShoppingCartComponent);
    component = fixture.componentInstance;
    // crudService = TestBed.inject(CrudService);
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });

  it('test01', () => {
    component.item.id=1
    component.item.quantity = '10';
    // mockCrudService.put.and.returnValue(Promise.resolve({ result: 'success' }))
    component.changeQuantity();
    expect(component.item.quantity).toBe('10');
    // expect(mockCrudService.put).toHaveBeenCalledWith("cart", {id:1,quantity:'10'});
  });

  it('test02', () => {
    component.item.quantity = 'abc2';
    component.changeQuantity();
    expect(component.item.quantity).toBe('2');
    // expect(mockCrudService.put).toHaveBeenCalledWith("cart", {id:1,quantity:2});
  });

  it('test03', () => {
    component.item.quantity = '0';
    component.changeQuantity();
    expect(component.item.quantity).toBe(1);
    // expect(mockCrudService.put).toHaveBeenCalledWith("cart", {id:1,quantity:1});
  });

  it('test04', () => {
    component.item.quantity = '100';
    component.changeQuantity();
    expect(component.item.quantity).toBe(99);
    // expect(mockCrudService.put).toHaveBeenCalledWith("cart", {id:1,quantity:99});
  });

});
