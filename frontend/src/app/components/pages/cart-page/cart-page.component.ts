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

  ngOnInit(): void {}
  removeToCart(cartId:string) {}
  checkout() {}
}
