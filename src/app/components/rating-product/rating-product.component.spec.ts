import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RatingProductComponent } from './rating-product.component';
import { NgZorroAntModule } from 'src/app/ng-zorro-ant.module';
import { SharedTestingModule } from 'src/app/shared-testing/shared-testing.module';
import { NzRateModule } from 'ng-zorro-antd/rate';
import { FormsModule } from '@angular/forms';
import { NzGridModule } from 'ng-zorro-antd/grid';

describe('RatingProductComponent', () => {
  let component: RatingProductComponent;
  let fixture: ComponentFixture<RatingProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[SharedTestingModule,NzRateModule,FormsModule,NzGridModule],
      declarations: [ RatingProductComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RatingProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
