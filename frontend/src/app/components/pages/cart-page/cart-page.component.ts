import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { CartService } from 'src/app/services/cart.service';
import { Cart } from 'src/app/shared/models/Cart';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css'],
})
export class CartPageComponent {
  getCartDataSub!: Subscription;
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
  cart!: Cart;
  constructor(private cartService: CartService) {
    this.cartService.getCartData().subscribe((cart: any) => {
      this.cartItems = cart.cart;
    });

    this.cartService.getCartData().subscribe((data: any) => {
      if (data.cart) {
        this.cartItems = data.cart.cartItems;
        this.cartDetails = data.cart;
        this.price = this.cartDetails.totalPrice;
        this.priceSummary.price = this.price;
        this.priceSummary.discount = 0;
        this.priceSummary.tax = 0;
        this.priceSummary.delivery = 0;
        this.priceSummary.total = this.price + this.price;
      }
    });
  }

  ngOnInit(): void {
    let cart = localStorage.getItem('cart');
    if (cart && !localStorage.getItem('token')) {
      let localCart = JSON.parse(cart);
      this.cartItems = localCart.cartItems;
      this.cartDetails = localCart;
      localStorage.setItem('cart', JSON.stringify(this.cartDetails));
    } else if (!cart && !localStorage.getItem('token')) {
    } else {
      this.cartService.getUserCart();
      this.cartService.getCartData().subscribe((data: any) => {
        if (data) {
          this.cartItems = data.cartItems;
          this.cartDetails = data;
          localStorage.setItem('cart', JSON.stringify(this.cartDetails));
        }
      });
    }
  }

  cartUpdate(productId: string, quantity: number) {
    this.cartService.cartUpdate(productId, quantity);
    this.cartService.getCartData().subscribe((data: any) => {
      if (data) {
        this.cartItems = data.cartItems;
        this.cartDetails = data;
      }
      localStorage.setItem('cart', JSON.stringify(this.cartDetails));
    });
  }

  ngOnDestroy() {
    this.getCartDataSub && this.getCartDataSub.unsubscribe();
  }
}
