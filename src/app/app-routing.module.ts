import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { RegisterComponent } from './pages/register/register.component';
import { NewpasswordComponent } from './pages/newpassword/newpassword.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { DetailProductComponent } from './pages/detail-product/detail-product.component';
import { CollectionsComponent } from './pages/collections/collections.component';

const routes: Routes = [

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
    path:'account/newpassword/:token',
    component:NewpasswordComponent
  },
  // {
  //   path:'allproducts'
  // },
  {
    path:'products/:id',
    component:DetailProductComponent
  },
  {
    path:'collections',
    component:CollectionsComponent
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
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
