import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { LoginGuard } from './guards/login.guard';
import { HistoryComponent } from './pages/history/history.component';
import { CartComponent } from './pages/home/cart/cart.component';
import { CheckoutComponent } from './pages/home/checkout/checkout.component';
import { HomeComponent } from './pages/home/home.component';
import { ProductComponent } from './pages/home/product/product.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { NotfoundComponent } from './shared/notfound/notfound.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/login'
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'signup',
    component: SignupComponent,
  },
  {
    path: 'home',
    canActivate: [LoginGuard],
    children: [
      {
        path: '',
        component: HomeComponent,
      },
      {
        path:"product/:id",
        component:ProductComponent
      },
      {
        path: 'cart',
        component: CartComponent,
      },
      {
        path: "checkout",
        component: CheckoutComponent
      }
    ]
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [LoginGuard]
  },
  {
    path: 'history',
    component: HistoryComponent,
    canActivate: [LoginGuard]
  },
  {
    path: '**',
    component: NotfoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
