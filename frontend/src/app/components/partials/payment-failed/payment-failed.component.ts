import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { PAYMENT_STATUS_URL } from 'src/app/shared/constants/urls';

@Component({
  selector: 'app-payment-failed',
  templateUrl: './payment-failed.component.html',
  styleUrls: ['./payment-failed.component.css'],
})
export class PaymentFailedComponent {
  constructor(private http: HttpClient) {}
  ngOnInit(): void {
    this.check();
  }
  check() {
    this.http
      .post(PAYMENT_STATUS_URL, {
        id: JSON.parse(localStorage.getItem('paymentResponse') || '').id,
      })
      .subscribe((res) => {
        localStorage.setItem('paymentIntent', JSON.stringify(res));
      });
  }
}
