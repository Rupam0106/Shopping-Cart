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
import { MyOrdersComponent } from './components/pages/my-orders/my-orders.component';
import { AddProductComponent } from './admin/add-product/add-product.component';
import { adminAuthGuard } from './auth/admin-auth/admin-auth.guard';
import { UpdateProductComponent } from './admin/update-product/update-product.component';
import { AdminHomeComponent } from './admin/admin-home/admin-home.component';
import { CheckoutComponent } from './components/pages/checkout/checkout.component';
import { OrderDetailsComponent } from './components/pages/order-details/order-details.component';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';
import { NotFoundComponent } from './components/partials/not-found/not-found.component';
import { PaymentSuccessComponent } from './components/partials/payment-success/payment-success.component';
import { PaymentFailedComponent } from './components/partials/payment-failed/payment-failed.component';
import { TrackPageComponent } from './components/partials/track-page/track-page.component';

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
    canActivate: [authGuard],
  },
  {
    path: 'user/cart/create',
    component: CartPageComponent,
  },
  {
    path: 'user/orders',
    component: MyOrdersComponent,
    canActivate: [authGuard],
  },
  {
    path: 'user/order/checkout',
    component: CheckoutComponent,
  },
  {
    path: 'user/order/details/:orderId',
    component: OrderDetailsComponent,
    canActivate: [authGuard],
  },
  {
    path: 'user/order/payment/success',
    component: PaymentSuccessComponent,
  },
  {
    path: 'user/order/payment/failed',
    component: PaymentFailedComponent,
  },
  {
    path: 'user/order/payment/track/:orderId',
    component: TrackPageComponent,
    canActivate: [authGuard],
  },
  {
    path: 'admin/home',
    component: AdminHomeComponent,
    canActivate: [adminAuthGuard],
  },
  {
    path: 'admin/products/new',
    component: AddProductComponent,
    canActivate: [adminAuthGuard],
  },
  {
    path: 'admin/product/update/:id',
    component: UpdateProductComponent,
    canActivate: [adminAuthGuard],
  },
  {
    path: 'admin/orders',
    component: AdminOrdersComponent,
    canActivate: [adminAuthGuard],
  },

  {
    path: '**',
    component: NotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
