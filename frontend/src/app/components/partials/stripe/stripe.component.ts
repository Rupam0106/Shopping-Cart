import { HttpClient } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { loadStripe } from '@stripe/stripe-js';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/services/cart.service';
import { OrderService } from 'src/app/services/order.service';
import {
  CREATE_PAYMENT_URL,
  PUBLISHABLE_KEY,
} from 'src/app/shared/constants/urls';

@Component({
  selector: 'app-stripe',
  templateUrl: './stripe.component.html',
  styleUrls: ['./stripe.component.css'],
})
export class StripeComponent {
  @Input()
  order!: any;

  constructor(
    private toastr: ToastrService,
    private cartService: CartService,
    private http: HttpClient,
    private orderService: OrderService
  ) {}
  onPayment() {
    console.log('order', this.order);
    this.orderService.orderPlace(this.order[0].shippingDetails).subscribe();
    const response = this.http
      .post(CREATE_PAYMENT_URL, {
        itmes: this.order[0].shippingDetails.address,
      })
      .subscribe(async (res: any) => {
        let stripe = await loadStripe(PUBLISHABLE_KEY);
        localStorage.setItem('paymentResponse', JSON.stringify(res));
        console.log('paymentResponse', stripe);

        stripe?.redirectToCheckout({
          sessionId: res.id,
        });
      });

    localStorage.removeItem('cart');
    this.cartService.storeLocalCart();
  }
}
