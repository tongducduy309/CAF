import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { RegisterComponent } from './pages/register/register.component';
import { NewpasswordComponent } from './pages/newpassword/newpassword.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { DetailProductComponent } from './pages/detail-product/detail-product.component';
import { CollectionsComponent } from './pages/collections/collections.component';
import { AllProductsComponent } from './pages/all-products/all-products.component';
import { CartComponent } from './pages/cart/cart.component';
import { BlogsComponent } from './pages/blogs/blogs.component';
import { DetailBlogComponent } from './pages/detail-blog/detail-blog.component';
import { TermsAndConditionsComponent } from './pages/terms-and-conditions/terms-and-conditions.component';
import { SearchComponent } from './pages/search/search.component';
import { PrivacyPolicyComponent } from './pages/privacy-policy/privacy-policy.component';
import { FaqComponent } from './pages/faq/faq.component';
import { ContactWithUsComponent } from './pages/contact-with-us/contact-with-us.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { AccountComponent } from './pages/account/account.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { OrdersComponent } from './pages/orders/orders.component';
import { ManageProductsComponent } from './pages/manage-products/manage-products.component';
import { FlashSalesComponent } from './pages/flash-sales/flash-sales.component';
import { VouchersComponent } from './pages/vouchers/vouchers.component';
import { DetailBillComponent } from './pages/detail-bill/detail-bill.component';
import { ManageOrdersComponent } from './pages/manage-orders/manage-orders.component';
import { ManageAccountsComponent } from './pages/manage-accounts/manage-accounts.component';

export const routes: Routes = [

  {
    path:'home',
    component:HomeComponent
  },
  {
    path:'',
    redirectTo: '/home',
    pathMatch: 'full' ,

  },
  {
    path:'account',
    component:AccountComponent,
  },
  {
    path:'account/login',
    component:LoginComponent
  },
  {
    path:'account/login/:param',
    component:LoginComponent
  },
  {
    path:'account/register',
    component:RegisterComponent
  },
  {
    path:'account/verify',
    component:RegisterComponent
  },
  {
    path:'account/new-password',
    component:NewpasswordComponent
  },
  {
    path:'products/:id',
    component:DetailProductComponent
  },
  // {
  //   path:'collections',
  //   component:CollectionsComponent
  // },
  {
    path:'all-products',
    component:AllProductsComponent
  },
  // {
  //   path:'all-products/:key',
  //   component:AllProductsComponent
  // },
  {
    path:'cart',
    component:CartComponent
  },
  {
    path:'about-us',
    component:AboutUsComponent
  },
  // {
  //   path:'contact-with-us',
  //   component:ContactWithUsComponent
  // },
  // {
  //   path:'faq',
  //   component:FaqComponent
  // },
  {
    path:'privacy-policy',
    component:PrivacyPolicyComponent
  },
  // {
  //   path:'search',
  //   component:SearchComponent
  // },
  {
    path:'terms-and-conditions',
    component:TermsAndConditionsComponent
  },
  // {
  //   path:'wishlist',
  //   component:WishlistComponent
  // },
  {
    path:'shipping-and-delivery',
    component:TermsAndConditionsComponent
  },
  {
    path:'checkout',
    component:CheckoutComponent
  },
  // {
  //   path:'blogs',
  //   component:BlogsComponent
  // },
  // {
  //   path:'blogs/:name',
  //   component:DetailBlogComponent
  // },
  {
    path:'dashboard',
    component:DashboardComponent,
    children:[
      {path:"manage-products",component:ManageProductsComponent},
      {path:"flash-sales",component:FlashSalesComponent},
      {path:"vouchers",component:VouchersComponent},
      {path:"orders",component:ManageOrdersComponent},
      {path:":title",component:ManageAccountsComponent}
    ]
  },
  {
    path:'orders',
    component:OrdersComponent
  },
  {
    path:'bill/:bid',
    component:DetailBillComponent
  },
  {
    path:'page-not-found',
    component:PageNotFoundComponent
  },
  {
    path:'**',
    redirectTo:'/page-not-found'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{
    onSameUrlNavigation: 'ignore'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
