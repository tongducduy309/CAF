import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageProductsComponent } from './manage-products.component';
import { SharedTestingModule } from 'src/app/shared-testing/shared-testing.module';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';

describe('ManageProductsComponent', () => {
  let component: ManageProductsComponent;
  let fixture: ComponentFixture<ManageProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[SharedTestingModule,NzTableModule,NzModalModule,NzDrawerModule],
      declarations: [ ManageProductsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
