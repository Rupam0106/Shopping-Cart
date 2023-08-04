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
import { FormsModule } from '@angular/forms';
import { ProductDetailsComponent } from './pages/product-details/product-details.component';
import { LoadingComponent } from './partials/loading/loading.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';
import { CartPageComponent } from './pages/cart-page/cart-page.component';

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
  ],
  exports: [HeaderComponent, FooterComponent, HomeComponent, ProductsComponent,LoadingComponent,],
  imports: [CommonModule,AppRoutingModule,FormsModule],
})
export class ComponentsModule {}
