import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillComponent } from './bill.component';
import { SharedTestingModule } from 'src/app/shared-testing/shared-testing.module';
import { RouterModule } from '@angular/router';

describe('BillComponent', () => {
  let component: BillComponent;
  let fixture: ComponentFixture<BillComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[SharedTestingModule,RouterModule],
      declarations: [ BillComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
