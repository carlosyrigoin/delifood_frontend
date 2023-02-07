import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { HomeComponent } from './pages/home/home.component';
import { LoadingComponent } from './shared/loading/loading.component';
import { NotfoundComponent } from './shared/notfound/notfound.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { NavegationComponent } from './shared/navegation/navegation.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FooterComponent } from './shared/footer/footer.component';
import { ServiceInterceptor } from './interceptors/service.interceptor';
import { HistoryComponent } from './pages/history/history.component';
import { CartComponent } from './pages/home/cart/cart.component';
import { ProductComponent } from './pages/home/product/product.component';
import { CheckoutComponent } from './pages/home/checkout/checkout.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    HomeComponent,
    LoadingComponent,
    NotfoundComponent,
    ProfileComponent,
    NavegationComponent,
    FooterComponent,
    HistoryComponent,
    CartComponent,
    ProductComponent,
    CheckoutComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ServiceInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
