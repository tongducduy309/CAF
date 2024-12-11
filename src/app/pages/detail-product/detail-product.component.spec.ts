import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailProductComponent } from './detail-product.component';
import { SharedTestingModule } from 'src/app/shared-testing/shared-testing.module';
import { NzBackTopModule } from 'ng-zorro-antd/back-top';
import { NzRateModule } from 'ng-zorro-antd/rate';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NoteProductComponent } from 'src/app/components/note-product/note-product.component';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { FormsModule } from '@angular/forms';
import { NzIconModule } from 'ng-zorro-antd/icon';

describe('DetailProductComponent', () => {
  let component: DetailProductComponent;
  let fixture: ComponentFixture<DetailProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[SharedTestingModule,NzBackTopModule,NzRateModule,NzSelectModule,NzInputModule,NzModalModule,NzGridModule,FormsModule,NzIconModule],
      declarations: [ DetailProductComponent,NoteProductComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
