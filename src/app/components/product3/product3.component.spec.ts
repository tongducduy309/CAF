import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Product3Component } from './product3.component';
import { SharedTestingModule } from 'src/app/shared-testing/shared-testing.module';
import { NoteProductComponent } from '../note-product/note-product.component';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { FormsModule } from '@angular/forms';
import { NzInputModule } from 'ng-zorro-antd/input';

describe('Product3Component', () => {
  let component: Product3Component;
  let fixture: ComponentFixture<Product3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[SharedTestingModule,NzModalModule,NzSelectModule,FormsModule,NzInputModule],
      declarations: [ Product3Component,NoteProductComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Product3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
