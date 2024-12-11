import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllProductsComponent } from './all-products.component';
import { SharedTestingModule } from 'src/app/shared-testing/shared-testing.module';
import { NzBackTopModule } from 'ng-zorro-antd/back-top';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { FormsModule } from '@angular/forms';

describe('AllProductsComponent', () => {
  let component: AllProductsComponent;
  let fixture: ComponentFixture<AllProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[SharedTestingModule,NzBackTopModule,NzCollapseModule,FormsModule],
      declarations: [ AllProductsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
