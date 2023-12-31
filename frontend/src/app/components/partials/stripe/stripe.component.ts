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

  constructor(
    private orderService: OrderService,
    private paymentService: PaymentService
  ) {}
  onPayment() {
    this.orderService.orderPlace(this.form, this.order).subscribe((res) => {
      this.sendMail(res.userOrder._id);
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
  }

  sendMail(id: any) {
    this.paymentService.orderDetailsMail(id).subscribe();
  }
}
