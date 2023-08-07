import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import {
  CANCEL_ORDER_URL,
  CREATE_ORDER_URL,
  DELIVERED_ORDER_URL,
} from '../shared/constants/urls';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(
    private http: HttpClient,
    private toastr: ToastrService,
    private router: Router
  ) {}

  createOrder(productId: any) {
    console.log(productId);
    return this.http.get<any>(CREATE_ORDER_URL, productId).pipe(
      tap({
        next: (cart: any) => {
          console.log(cart);

          this.toastr.success(
            `Order created Successfully ${cart.name}`,
            'Order'
          );
          this.router.navigate(['/user/order/create']);
        },
        error: (errorResponse: any) => {
          this.toastr.error(errorResponse.error.message, 'Order Failed');
        },
      })
    );
  }

  cancelOrder(productId: any) {
    console.log(productId);
    return this.http.put<any>(CANCEL_ORDER_URL, productId).pipe(
      tap({
        next: (order: any) => {
          console.log(order);

          this.toastr.success(
            `Order Cancel Successfully ${order.name}`,
            'Cart'
          );
          this.router.navigate(['/user/order/cancel']);
        },
        error: (errorResponse: any) => {
          this.toastr.error(errorResponse.error.message, 'Order Failed');
        },
      })
    );
  }

  deliveredOrder(productId: any) {
    console.log(productId);
    return this.http.put<any>(DELIVERED_ORDER_URL, productId).pipe(
      tap({
        next: (order: any) => {
          console.log(order);

          this.toastr.success(
            `Order ${order.name} Delivered Successfully`,
            'Order'
          );
          this.router.navigate(['/user/order/delivered']);
        },
        error: (errorResponse: any) => {
          this.toastr.error(errorResponse.error.message, 'Order Failed');
        },
      })
    );
  }
}
