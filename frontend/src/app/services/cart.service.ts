import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import {
  CREATE_CART_URL,
  GET_CART_URL,
  UPDATE_CART_URL,
} from '../shared/constants/urls';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  count: number = 0;
  cartData: [] = [];
  private cartDataSubject: BehaviorSubject<any[]> = new BehaviorSubject<any[]>(
    []
  );
  getCartData(): Observable<any> {
    return this.cartDataSubject.asObservable();
  }

  constructor(
    private http: HttpClient,
    private toastr: ToastrService,
  ) {}

  getUserCartData() {
    return this.http.get<any>(GET_CART_URL).pipe(
      tap({
        next: (cart: any) => {
          this.cartData = cart;
          console.log(cart)
          this.cartDataSubject.next(this.cartData);
          localStorage.setItem('cart', JSON.stringify(this.cartData));
        },
        error: (errorResponse) => {
          this.toastr.error(errorResponse.error.message, 'Cart Failed');
        },
      })
    );
  }

  addToCart(productId: any) {
    return this.http.post<any>(CREATE_CART_URL, { productId }).pipe(
      tap({
        next: (cart: any) => {
          this.cartData = cart;
          this.cartDataSubject.next(this.cartData);
          localStorage.setItem('cart', JSON.stringify(this.cartData));
          this.toastr.success(`Item Added into Cart`, 'Cart');
        },
        error: (errorResponse) => {
          this.toastr.error(errorResponse.error.message, 'Cart Failed');
        },
      })
    );
  }

  updateCartData(productId: string, quantity: number) {
    return this.http.put<any>(UPDATE_CART_URL, { productId, quantity }).pipe(
      tap({
        next: (cart: any) => {
          this.cartData = cart;
          console.log(cart)
          this.cartDataSubject.next(this.cartData);
          localStorage.setItem('cart', JSON.stringify(this.cartData));
          this.toastr.success(`Item Updated into Cart`, 'Cart');
        },
        error: (errorResponse) => {
          this.toastr.error(errorResponse.error.message, 'Cart Failed');
        },
      })
    );
  }

}
