import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { WishlistService } from 'src/app/services/wishlist.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css'],
})
export class WishlistComponent {
  wishItems: any;
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
  cart!: any;
  constructor(
    private cartService: WishlistService,
    private toastr: ToastrService
  ) {
    this.cartService.getwishData().subscribe((cart: any) => {
      this.cartItems = cart.cart;
    });

    this.cartService.getwishData().subscribe((data: any) => {
      if (data) {
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
      }
    });
  }

  ngOnInit(): void {
    let cart = localStorage.getItem('wish');
    if (cart && !localStorage.getItem('token')) {
      let localCart = JSON.parse(cart);
      this.cartItems = localCart.cartItems;
      this.cartDetails = localCart;
      localStorage.setItem('wish', JSON.stringify(this.cartDetails));
    } else if (!cart && !localStorage.getItem('token')) {
    } else {
      this.cartService.getUserwish();
      this.cartService.getwishData().subscribe((data: any) => {
        if (data) {
          this.cartItems = data.cartItems;
          this.cartDetails = data;
          localStorage.setItem('wish', JSON.stringify(this.cartDetails));
        }
      });
    }
  }

  cartUpdate(productId: string, quantity: number) {
    this.cartService.wishUpdate(productId, quantity);
    this.cartService.getwishData().subscribe((data: any) => {
      if (data) {
        this.cartItems = data.cartItems;
        this.cartDetails = data;
      }
      localStorage.setItem('wish', JSON.stringify(this.cartDetails));
    });
  }

  ngOnDestroy() {
    this.getCartDataSub && this.getCartDataSub.unsubscribe();
  }
}
