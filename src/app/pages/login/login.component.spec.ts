import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { SharedTestingModule } from 'src/app/shared-testing/shared-testing.module';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NgZorroAntModule } from 'src/app/ng-zorro-ant.module';
import { FormsModule } from '@angular/forms';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[SharedTestingModule,FormsModule,NzInputModule,NzGridModule],
      declarations: [ LoginComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA] 
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


});
