import { CartService } from './../../../services/cart.service';
import { Component } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-payment-page',
  templateUrl: './payment-page.component.html',
  styleUrls: ['./payment-page.component.css'],
})
export class PaymentPageComponent {
  constructor(
     private cartService: CartService,
  ) {}
  orders: any;
  name: any;
  address: any;
  totalPrice: any;

  getTime(input: string) {
    return new Date(input).toLocaleDateString();
  }
  ngOnInit() {
    this.cartService.getCartData().subscribe((response: any) => {
      this.orders = response.cartItems;
      console.log(response);
      this.name = response.cartItems;
      this.address =
        response.order[0].shippingDetails.address.house +
        ', ' +
        response.order[0].shippingDetails.address.street +
        ', ' +
        response.order[0].shippingDetails.address.city +
        ', ' +
        response.order[0].shippingDetails.address.state +
        ', ' +
        response.order[0].shippingDetails.address.pincode;
      let sum = 0;
      for (let i = 0; i < response.order.length; i++) {
        sum += response.order[0].orderDetails.totalPrice;
      }
      this.totalPrice = sum;
    });
  }
  
}
