import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css'],
})
export class CartPageComponent {
  cartData: any[] | undefined;
  priceSummary: any = {
    price: 0,
    discount: 0,
    tax: 0,
    delivery: 0,
    total: 0,
  };
  constructor(private cart: CartService, private router: Router) {}
  productQuantity: number = 1;
  ngOnInit(): void {}
  removeToCart(cartId:string) {}
  checkout() {}

  handleQuantity(val: string) {
    if (this.productQuantity < 20 && val === 'plus') {
      this.productQuantity += 1;
    } else if (this.productQuantity > 1 && val === 'min') {
      this.productQuantity -= 1;
    }
  }
}
