import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoteProductComponent } from './note-product.component';
import { SharedTestingModule } from 'src/app/shared-testing/shared-testing.module';
import { NzModalModule } from 'ng-zorro-antd/modal';

describe('NoteProductComponent', () => {
  let component: NoteProductComponent;
  let fixture: ComponentFixture<NoteProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[SharedTestingModule,NzModalModule],
      declarations: [ NoteProductComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NoteProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
