import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';

let components:any = [

]

let pages = [
  AppComponent,
  LoginComponent
]

@NgModule({
  declarations: [...components,...pages],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [...pages]
})
export class AppModule { }
