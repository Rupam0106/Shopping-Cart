import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';

import { Cart } from '../shared/models/Cart';
import { Product } from '../shared/models/Product';
import { CartItem } from '../shared/models/CartItem';
import { CREATE_CART_URL, GET_CART_URL, UPDATE_CART_URL } from '../shared/constants/urls';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cart: Cart = this.getCartFromLocalStorage();
  cartData: [] = [];
  private cartDataSubject: BehaviorSubject<any[]> = new BehaviorSubject<any[]>(
    []
  );
  getCartData(): Observable<any> {
    return this.cartDataSubject.asObservable();
  }
  private cartSubject: BehaviorSubject<Cart> = new BehaviorSubject(this.cart);
  constructor(
    private http: HttpClient,
    private toastr: ToastrService,
  ) {}

  addToCart1(product: Product): void {
    let cartItem = this.cart.items.find(
      (item) => item.product._id === product._id
    );
    if (cartItem) return;
    console.log(product);
    this.cart.items.push(new CartItem(product));
    this.setCartToLocalStorage();
  }

  removeFromCart(productId: string): void {
    this.cart.items = this.cart.items.filter(
      (item) => item.product._id != productId
    );
    this.setCartToLocalStorage();
  }

  changeQuantity(productId: string, quantity: number) {
    let cartItem = this.cart.items.find(
      (item) => item.product._id === productId
    );
    if (!cartItem) return;

    cartItem.quantity = quantity;
    cartItem.price = quantity * cartItem.product.price;
    this.setCartToLocalStorage();
  }

  clearCart() {
    this.cart = new Cart();
    this.setCartToLocalStorage();
  }

  getCartObservable(): Observable<Cart> {
    return this.cartSubject.asObservable();
  }

  getCart(): Cart {
    return this.cartSubject.value;
  }
  getUserCartData() {
    return this.http.get<any>(GET_CART_URL).pipe(
      tap({
        next: (cart: any) => {
          this.cartData = cart;
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
          localStorage.setItem('Cart', JSON.stringify(this.cartData));
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
          this.cartDataSubject.next(this.cartData);
          localStorage.setItem('Cart', JSON.stringify(this.cartData));
          this.toastr.success(`Item Updated into Cart`, 'Cart');
        },
        error: (errorResponse) => {
          this.toastr.error(errorResponse.error.message, 'Cart Failed');
        },
      })
    );
  }

  private setCartToLocalStorage(): void {
    this.cart.totalPrice = this.cart.items.reduce(
      (prevSum, currentItem) => prevSum + currentItem.price,
      0
    );
    this.cart.totalCount = this.cart.items.reduce(
      (prevSum, currentItem) => prevSum + currentItem.quantity,
      0
    );

    const cartJson = JSON.stringify(this.cart);
    localStorage.setItem('Cart', cartJson);
    this.cartSubject.next(this.cart);
  }

  private getCartFromLocalStorage(): Cart {
    const cartJson = localStorage.getItem('Cart');
    return cartJson ? JSON.parse(cartJson) : new Cart();
  }
}
