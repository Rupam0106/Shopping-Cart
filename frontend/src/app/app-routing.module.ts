import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/pages/home/home.component';
import { ProductsComponent } from './components/pages/products/products.component';
import { LoginComponent } from './components/pages/login/login.component';
import { RegisterComponent } from './components/pages/register/register.component';
import { ProductDetailsComponent } from './components/pages/product-details/product-details.component';
import { ForgotPasswordComponent } from './components/pages/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './components/pages/reset-password/reset-password.component';
import { UserProfileComponent } from './components/pages/user-profile/user-profile.component';
import { CartPageComponent } from './components/pages/cart-page/cart-page.component';
import { authGuard } from './auth/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'products',
    component: ProductsComponent,
  },
  {
    path: 'product/:id',
    component: ProductDetailsComponent,
  },
  {
    path: 'user/password/forgot',
    component: ForgotPasswordComponent,
  },
  {
    path: 'user/password/reset/:resetToken',
    component: ResetPasswordComponent,
  },
  {
    path: 'user/me',
    component: UserProfileComponent,
    canActivate:[authGuard]
  },
  {
    path: 'user/cart/create',
    component: CartPageComponent,
    canActivate:[authGuard]
  },
  {
    path: 'user/cart/update',
    component: CartPageComponent,
    canActivate:[authGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
