import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardComponent } from './dashboard.component';
import { SharedTestingModule } from 'src/app/shared-testing/shared-testing.module';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { RouterTestingModule } from '@angular/router/testing';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[SharedTestingModule,NzLayoutModule,RouterTestingModule,NzToolTipModule],
      declarations: [ DashboardComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
