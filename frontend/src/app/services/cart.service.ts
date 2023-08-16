import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Cart } from '../shared/models/Cart';
import {
  CREATE_CART_URL,
  GET_CART_URL,
  UPDATE_CART_URL,
  UPDATE_LOCAL_CART_URL,
} from '../shared/constants/urls';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(private toastr: ToastrService, private http: HttpClient) {}

  cartData: any;

  private cartDataSubject: BehaviorSubject<Cart[]> = new BehaviorSubject<
    Cart[]
  >(<any>[]);

  getCartData(): Observable<any> {
    return this.cartDataSubject.asObservable();
  }

  getUserCart(): void {
    let cart = localStorage.getItem('cart');
    if (!localStorage.getItem('token')) {
      if (cart) {
        this.cartData = JSON.parse(cart);
        localStorage.setItem('cart', JSON.stringify(this.cartData));
        this.toastr.success('Product Added');
        return this.cartDataSubject.next(this.cartData);
      } else {
        return this.cartDataSubject.next(this.cartData);
      }
    } else {
      this.http.get(GET_CART_URL).subscribe((response: any) => {
        this.cartData = response.cart;
        this.cartDataSubject.next(this.cartData);
        localStorage.setItem('cart', JSON.stringify(this.cartData));
      });
    }
  }


  storeLocalCart() {
    let cart = localStorage.getItem('cart');
    if (cart) {
      cart = JSON.parse(cart);
      this.http.put(UPDATE_LOCAL_CART_URL, this.cartData).subscribe((response: any) => {
        this.cartData = response.cart;
        localStorage.setItem('cart', JSON.stringify(this.cartData));
        return this.cartDataSubject.next(this.cartData);
      });
    }
  }

  addToCart(data: any): void {
    if (!localStorage.getItem('token')) {
      let cart = localStorage.getItem('cart');
      if (cart) {
        let localCart = JSON.parse(cart);
        let cartItemIndex = localCart.cartItems.findIndex(
          (x: any) => x.productId._id == data._id
        );

        //  IF ITEM IS ALREADY PRESENT IN A CART
        if (cartItemIndex >= 0) {
          let product = localCart.cartItems[cartItemIndex];
          console.log(product);
          product.quantity += 1;
          localCart.totalItems += 1;
          localCart.totalPrice += product.productId.price;
          this.cartData = localCart;
          localStorage.setItem('cart', JSON.stringify(this.cartData));
          return this.cartDataSubject.next(this.cartData);
        }

        //  IF ITEM IS NOT PRESENT IN A CART
        else {
          this.cartData = {
            cartItems: [
              ...localCart.cartItems,
              { productId: data, quantity: 1 },
            ],
            totalItems: localCart.totalItems + 1,
            totalPrice: localCart.totalPrice + data.price,
          };
          localStorage.setItem('cart', JSON.stringify(this.cartData));
          this.toastr.success('product added to cart');
          return this.cartDataSubject.next(this.cartData);
        }
      }
      //  IF ITEM IS NOT PRESENT IN A LOCAL_STORAGE
      else {
        this.cartData = {
          cartItems: [{ productId: data, quantity: 1 }],
          totalItems: 1,
          totalPrice: data.price,
        };
        localStorage.setItem('cart', JSON.stringify(this.cartData));
        this.toastr.success('product added to cart');
        return this.cartDataSubject.next(this.cartData); // Emit
      }
    }
    //  IF USER IS LOGGED IN
    else {
      this.http
        .post(CREATE_CART_URL, { productId: data._id })
        .subscribe((response: any) => {
          this.cartData = response.cart;
          this.cartDataSubject.next(this.cartData);
          localStorage.setItem('cart', JSON.stringify(this.cartData));
          this.toastr.success(response.msg);
        });
    }
  }

  cartUpdate(data: any, quantity: number): void {
    if (!localStorage.getItem('token')) {
      let cart = localStorage.getItem('cart');
      if (cart) {
        let localCart = JSON.parse(cart);
        let cartItemIndex = localCart.cartItems.findIndex(
          (x: any) => x.productId._id == data
        );
        // INDEX PRODUCT IN CARTITEMS
        let product = localCart.cartItems[cartItemIndex];
        // REMOVE ITEM BY USER
        if (quantity < 1) {
          localCart.totalPrice -= product.quantity * product.productId.price;
          localCart.totalItems -= product.quantity;
          localCart.cartItems.splice(cartItemIndex, 1);
          this.cartData = localCart;
          localStorage.setItem('cart', JSON.stringify(localCart));
          return this.cartDataSubject.next(localCart);
        }
        // IF USER DECREASE THE QUANTITY
        else if (quantity > product.quantity) {
          product.quantity += 1;
          localCart.totalItems += 1;
          localCart.totalPrice += product.productId.price;
          this.cartData = localCart;
          localStorage.setItem('cart', JSON.stringify(localCart));
          return this.cartDataSubject.next(localCart);
        }
        // IF USER DECREASE THE QUANTITY
        else if (quantity < product.quantity) {
          product.quantity -= 1;
          localCart.totalItems -= 1;
          localCart.totalPrice -= product.productId.price;
          this.cartData = localCart;
          localStorage.setItem('cart', JSON.stringify(localCart));
          return this.cartDataSubject.next(localCart);
        }
      }
    }
    // IF USER LOGGED IN
    else {
      this.http
        .put(UPDATE_CART_URL, { productId: data, quantity })
        .subscribe((response: any) => {
          this.cartData = response.cart;
          this.cartDataSubject.next(this.cartData);
          this.toastr.success(response.msg);
          localStorage.setItem('cart', JSON.stringify(this.cartData));
        });
    }
  }
}
