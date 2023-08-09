import { Component } from '@angular/core';
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
  constructor(private cartService: CartService) {
    this.cartService.getCartData().subscribe((data: any) => {
      if (data.cart) {
        this.cartItems = data.cart.cartItems;
        this.cartDetails = data.cart;
        this.price = this.cartDetails.totalPrice;
        this.priceSummary.price = this.price;
        this.priceSummary.discount = 0 ;
        this.priceSummary.tax = 0 ;
        this.priceSummary.delivery = 0;
        this.priceSummary.total =
          this.price + this.price
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
