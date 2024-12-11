import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Product2Component } from './product2.component';
import { SharedTestingModule } from 'src/app/shared-testing/shared-testing.module';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NoteProductComponent } from '../note-product/note-product.component';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzInputModule } from 'ng-zorro-antd/input';
import { FormsModule } from '@angular/forms';

describe('Product2Component', () => {
  let component: Product2Component;
  let fixture: ComponentFixture<Product2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[SharedTestingModule,NzSelectModule,NzModalModule,NzInputModule,FormsModule],
      declarations: [ Product2Component,NoteProductComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Product2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
