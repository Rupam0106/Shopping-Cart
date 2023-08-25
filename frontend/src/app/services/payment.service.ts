import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  CREATE_PAYMENT_URL,
  MAIL_ORDER_STATUS_URL,
} from '../shared/constants/urls';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  constructor(private http: HttpClient) {}
  payment(order: any, form: any) {
    return this.http.post(CREATE_PAYMENT_URL, { cart: order, form });
  }

  orderDetailsMail(orderId: any) {
    return this.http.post(MAIL_ORDER_STATUS_URL, { orderId });
  }
}
