import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { NgZorroAntModule } from '../ng-zorro-ant.module';
import { CrudService } from 'src/services/crud.service';
import { HttpClientModule } from '@angular/common/http';
import { NzInputModule } from 'ng-zorro-antd/input';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { UserService } from 'src/services/user.service';
import { MainService } from 'src/services/main.service';
import { NzRateModule } from 'ng-zorro-antd/rate';
import { NZ_ICONS, NzIconModule } from 'ng-zorro-antd/icon';
import { NoteProductComponent } from '../components/note-product/note-product.component';
import { LeftOutline } from '@ant-design/icons-angular/icons';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterTestingModule,
    FormsModule,
    NgZorroAntModule,
    NzNotificationModule,
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    NzInputModule,
    NzGridModule,
    NzRateModule,
    NzIconModule,
  ],
  providers:[
    CrudService,
    UserService,
    MainService,
    { provide: NZ_ICONS, useValue: [LeftOutline] }
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SharedTestingModule { }
