import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';
import { PAYMENT_STATUS_URL } from 'src/app/shared/constants/urls';

@Component({
  selector: 'app-payment-success',
  templateUrl: './payment-success.component.html',
  styleUrls: ['./payment-success.component.css'],
})
export class PaymentSuccessComponent {
  data: any;
  order: any;
  constructor(private http: HttpClient, private orderService: OrderService) {}
  ngOnInit(): void {
    this.check();
    
  }
  check() {
    this.data = this.http
      .post(PAYMENT_STATUS_URL, {
        id: JSON.parse(localStorage.getItem('paymentResponse') || '').id,
      })
      .subscribe((res) => {
        localStorage.setItem('paymentIntent', JSON.stringify(res));
      });
  }
}
