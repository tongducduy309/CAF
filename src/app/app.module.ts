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
import { HeaderComponent } from './components/header/header.component';
import { NgZorroAntModule } from './ng-zorro-ant.module';
import { RegisterComponent } from './pages/register/register.component';
import { NewpasswordComponent } from './pages/newpassword/newpassword.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { FooterComponent } from './components/footer/footer.component';
import { Product1Component } from './components/product1/product1.component';
import { DetailProductComponent } from './pages/detail-product/detail-product.component';
import { Product2Component } from './components/product2/product2.component';
import { CollectionComponent } from './components/collection/collection.component';
import { CollectionsComponent } from './pages/collections/collections.component';
import { Product3Component } from './components/product3/product3.component';
import { AllProductsComponent } from './pages/all-products/all-products.component';
import { ItemShoppingCartComponent } from './components/item-shopping-cart/item-shopping-cart.component';
import { CartComponent } from './pages/cart/cart.component';
import { BlogsComponent } from './pages/blogs/blogs.component';
import { DetailBlogComponent } from './pages/detail-blog/detail-blog.component';
import { BlogComponent } from './components/blog/blog.component';
import { RatingProductComponent } from './components/rating-product/rating-product.component';
registerLocaleData(en);



export let components:any = [
  HeaderComponent,
  FooterComponent,
  Product1Component,
  Product2Component,
  Product3Component,
  CollectionComponent,
  ItemShoppingCartComponent,
  BlogComponent,
  RatingProductComponent
]

export let pages = [
  AppComponent,
  LoginComponent,
  HomeComponent,
  RegisterComponent,
  NewpasswordComponent,
  PageNotFoundComponent,
  DetailProductComponent,
  CollectionsComponent,
  AllProductsComponent,
  CartComponent,
  BlogsComponent,
  DetailBlogComponent
]

@NgModule({
  declarations: [...components,...pages],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    NgZorroAntModule
  ],
  providers: [
    { provide: NZ_I18N, useValue: en_US }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
