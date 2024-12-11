import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { SharedTestingModule } from 'src/app/shared-testing/shared-testing.module';
import { Product2Component } from 'src/app/components/product2/product2.component';
import { Product3Component } from 'src/app/components/product3/product3.component';
import { NzGridModule } from 'ng-zorro-antd/grid';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[SharedTestingModule, NzGridModule],
      declarations: [ HomeComponent,Product2Component,Product3Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
