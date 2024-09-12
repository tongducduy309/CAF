import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from './environment';
import { ProductComponent } from './components/product/product.component';
<<<<<<< Updated upstream
import { HeaderComponent } from './components/header/header.component';
import { NgZorroAntModule } from './ng-zorro-ant.module';
=======
import { RegisterComponent } from './pages/register/register.component';
>>>>>>> Stashed changes
registerLocaleData(en);

export let components:any = [
  ProductComponent
]

export let pages = [
  AppComponent,
  LoginComponent,
  HomeComponent
]

@NgModule({
<<<<<<< Updated upstream
  declarations: [...components,...pages, HeaderComponent],
=======
  declarations: [...components,...pages, RegisterComponent],
>>>>>>> Stashed changes
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    NgZorroAntModule
  ],
  providers: [
    { provide: NZ_I18N, useValue: en_US }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
