import { LoginComponent } from './../../pages/login/login.component';
import { Component, Input } from '@angular/core';
import { loadStripe } from '@stripe/stripe-js';
import { OrderService } from 'src/app/services/order.service';
import { PaymentService } from 'src/app/services/payment.service';
import { PUBLISHABLE_KEY } from 'src/app/shared/constants/urls';

@Component({
  selector: 'app-stripe',
  templateUrl: './stripe.component.html',
  styleUrls: ['./stripe.component.css'],
})
export class StripeComponent {
  @Input()
  order!: any;

  @Input()
  form!: any;
  @Input()
  status!: any;
  handler: any;
  orderId: any;

  constructor(
    private orderService: OrderService,
    private paymentService: PaymentService
  ) {}
  onPayment() {
    this.orderService.orderPlace(this.form, this.order).subscribe((res) => {
      this.orderId = res.userOrder._id;
    });

    this.paymentService
      .payment(this.order, this.form)
      .subscribe(async (res: any) => {
        let stripe = await loadStripe(PUBLISHABLE_KEY);
        localStorage.setItem('paymentResponse', JSON.stringify(res));
        stripe?.redirectToCheckout({
          sessionId: res.id,
        });
      });
    if (localStorage.getItem('paymentResponse')) {
      this.sendMail();
    }
  }

  sendMail() {
    this.paymentService.orderDetailsMail(this.orderId).subscribe();
  }
}
