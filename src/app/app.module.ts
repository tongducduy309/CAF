import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { NZ_I18N, vi_VN } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import vi from '@angular/common/locales/vi';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './components/header/header.component';
import { NgZorroAntModule } from './ng-zorro-ant.module';
import { RegisterComponent } from './pages/register/register.component';
import { NewpasswordComponent } from './pages/newpassword/newpassword.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { FooterComponent } from './components/footer/footer.component';
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
import { TermsAndConditionsComponent } from './pages/terms-and-conditions/terms-and-conditions.component';
import { SearchComponent } from './pages/search/search.component';
import { PrivacyPolicyComponent } from './pages/privacy-policy/privacy-policy.component';
import { FaqComponent } from './pages/faq/faq.component';
import { ContactWithUsComponent } from './pages/contact-with-us/contact-with-us.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { SearchToolComponent } from './components/search-tool/search-tool.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { AccountComponent } from './pages/account/account.component';
import { BoxAddressComponent } from './components/box-address/box-address.component';
import { ManageAddressComponent } from './components/manage-address/manage-address.component';
import { NoteProductComponent } from './components/note-product/note-product.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { OrdersComponent } from './pages/orders/orders.component';
import { ManageProductsComponent } from './pages/manage-products/manage-products.component';
import { FlashSalesComponent } from './pages/flash-sales/flash-sales.component';
import { VouchersComponent } from './pages/vouchers/vouchers.component';
import { ItemInBillComponent } from './components/item-in-bill/item-in-bill.component';
import { BillComponent } from './components/bill/bill.component';
import { DetailBillComponent } from './pages/detail-bill/detail-bill.component';
import { CustomerReviewComponent } from './components/customer-review/customer-review.component';
import { ManageOrdersComponent } from './pages/manage-orders/manage-orders.component';
import { ShowFullInvoiceComponent } from './components/show-full-invoice/show-full-invoice.component';
import { ManageAccountsComponent } from './pages/manage-accounts/manage-accounts.component';
import { NzRateModule } from 'ng-zorro-antd/rate';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { IconDefinition } from '@ant-design/icons-angular';
import {  NZ_ICONS } from 'ng-zorro-antd/icon';
import { LeftOutline } from '@ant-design/icons-angular/icons';
import { Product1Component } from './components/product1/product1.component';
registerLocaleData(vi);
const icons: IconDefinition[] = [LeftOutline];

export let components:any = [
  HeaderComponent,
  FooterComponent,
  Product2Component,
  Product3Component,
  CollectionComponent,
  ItemShoppingCartComponent,
  BlogComponent,
  RatingProductComponent,
  SearchToolComponent,
  BoxAddressComponent,
  ManageAddressComponent,
  NoteProductComponent,
  ItemInBillComponent ,
  BillComponent,
  CustomerReviewComponent,
  DetailBillComponent,
  ShowFullInvoiceComponent,
  Product1Component
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
  DetailBlogComponent,
  TermsAndConditionsComponent,
  SearchComponent,
  PrivacyPolicyComponent,
  FaqComponent,
  ContactWithUsComponent,
  AboutUsComponent,
  CheckoutComponent,
  AccountComponent,
  DashboardComponent,
  OrdersComponent,
  ManageProductsComponent,
  FlashSalesComponent,
  VouchersComponent,
  DetailBillComponent,
  ManageOrdersComponent,
  ManageAccountsComponent
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
    NgZorroAntModule,
    NzRateModule
  ],
  providers: [
    { provide: NZ_I18N, useValue: vi_VN },
    { provide: NZ_ICONS, useValue: [LeftOutline] }

  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
