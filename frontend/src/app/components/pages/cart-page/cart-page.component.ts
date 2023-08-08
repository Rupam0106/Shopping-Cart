import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css'],
})
export class CartPageComponent {
 
  cartDetails: any;
  productQuantity: number = 1;
  cartItems: any[] = [];
  price: number = 0;
  priceSummary: any = {
    price: 0,
    discount: 0,
    tax: 0,
    delivery: 0,
    total: 0,
  };
  constructor(private cartService: CartService, private router: Router) {
    this.cartService.getUserCartData().subscribe()
    this.cartService.getCartData().subscribe((data: any) => {
      if (data.cart) {
        this.cartItems = data.cart.cartItems;
        this.cartDetails = data.cart;
        this.price = this.cartDetails.totalPrice;
        this.priceSummary.price = this.price;
        this.priceSummary.discount = this.price / 10;
        this.priceSummary.tax = this.price / 10;
        this.priceSummary.delivery = 100;
        this.priceSummary.total =
          this.price + this.price / 10 + 100 - this.price / 10;
      }
    });
  }
  cartUpdate(productId: any, quantity: any) {
    this.cartService.updateCartData(productId, quantity).subscribe();
    this.cartService.getCartData().subscribe((data: any) => {
      if (data.cart) {
        this.cartItems = data.cart.cartItems;
        this.cartDetails = data.cart;
      }
      localStorage.setItem('cart', JSON.stringify(this.cartDetails));
    });
  }
}
