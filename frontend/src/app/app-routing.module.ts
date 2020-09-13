import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ActionComponent } from './components/action/action.component';
import { CartComponent } from './components/cart/cart.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { ContactComponent } from './components/contact/contact.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { ProductComponent } from './components/product/product.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RegisterComponent } from './components/register/register.component';
import { ThankyouComponent } from './components/thankyou/thankyou.component';
import { ProfileGuard } from './guard/profile.guard';

const routes: Routes = [
  {
    path: '', component: HomeComponent
  },
  {
    path: 'product/:id', component: ProductComponent
  },
  {
    path: 'cart', component: CartComponent
  },
  {
    path: 'checkout', component: CheckoutComponent, canActivate: [ProfileGuard]
  },
  {
    path: 'thankyou', component: ThankyouComponent
  },
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'profile', component: ProfileComponent, canActivate: [ProfileGuard]
  },
  {
    path: 'register', component: RegisterComponent
  },
  {
    path: 'contact', component: ContactComponent
  },
  {
    path: 'action', component: ActionComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
