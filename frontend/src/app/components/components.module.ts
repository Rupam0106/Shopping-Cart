import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './partials/header/header.component';
import { FooterComponent } from './partials/footer/footer.component';
import { HomeComponent } from './pages/home/home.component';
import { ProductsComponent } from './pages/products/products.component';
import { AppRoutingModule } from '../app-routing.module';
import { HeroComponent } from './partials/hero/hero.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductDetailsComponent } from './pages/product-details/product-details.component';
import { LoadingComponent } from './partials/loading/loading.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';
import { CartPageComponent } from './pages/cart-page/cart-page.component';
import { MyOrdersComponent } from './pages/my-orders/my-orders.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { OrderDetailsComponent } from './pages/order-details/order-details.component';
import { NotFoundComponent } from './partials/not-found/not-found.component';
import { MatBadgeModule } from '@angular/material/badge';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { TitleComponent } from './partials/title/title.component';
import { PaymentSuccessComponent } from './partials/payment-success/payment-success.component';
import { PaymentFailedComponent } from './partials/payment-failed/payment-failed.component';
import { StripeComponent } from './partials/stripe/stripe.component';
import { TrackPageComponent } from './partials/track-page/track-page.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    ProductsComponent,
    HeroComponent,
    LoginComponent,
    RegisterComponent,
    ProductDetailsComponent,
    LoadingComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    UserProfileComponent,
    CartPageComponent,
    MyOrdersComponent,
    CheckoutComponent,
    OrderDetailsComponent,
    NotFoundComponent,
    TitleComponent,
    PaymentSuccessComponent,
    PaymentFailedComponent,
    StripeComponent,
    TrackPageComponent,
   
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    ProductsComponent,
    LoadingComponent,
  ],
  
  imports: [
    CommonModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatBadgeModule,
    MatIconModule,
    MatMenuModule,
  ],
})
export class ComponentsModule {}
