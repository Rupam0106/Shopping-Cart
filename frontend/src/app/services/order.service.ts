import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  CANCEL_ORDER_URL,
  CANCEL_SPECIFIC_ORDER_URL,
  CREATE_ORDER_URL,
  GET_ORDER_URL,
  GET_SPECIFIC_ORDER_URL,
  ORDER_NEW_FOR_CURRENT_USER_URL,
  TRACK_ORDER_STATUS_URL,
} from '../shared/constants/urls';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(private http: HttpClient) {}

  orderPlace(form: any, order: any) {
    return this.http.post<any>(CREATE_ORDER_URL, { form, order });
  }

  cancelOrderItem(orderId: string, productId: string) {
    return this.http.put<any>(CANCEL_SPECIFIC_ORDER_URL + orderId, productId);
  }

  getNewOrderForCurrentUser() {
    return this.http.get<any>(ORDER_NEW_FOR_CURRENT_USER_URL);
  }
  cancelOrder(orderId: string) {
    return this.http.put<any>(CANCEL_ORDER_URL + orderId, orderId);
  }

  getOrderDetails(orderId: any) {
    return this.http.get<any>(GET_ORDER_URL + orderId);
  }

  getSpecificOrderDetails(orderId: any) {
    return this.http.get<any>(GET_SPECIFIC_ORDER_URL + orderId);
  }

  getUserOrderDetails() {
    return this.http.get<any>(GET_ORDER_URL);
  }

  trackOrderDetails(id: any) {
    return this.http.get<any>(TRACK_ORDER_STATUS_URL + id);
  }
}
