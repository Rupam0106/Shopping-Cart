import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import {
  CANCEL_ORDER_URL,
  CANCEL_SPECIFIC_ORDER_URL,
  CREATE_ORDER_URL,
  GET_ORDER_URL,
  GET_SPECIFIC_ORDER_URL,
} from '../shared/constants/urls';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  orderData: any[] = [];
  private orderDataSubject: BehaviorSubject<any[]> = new BehaviorSubject<any[]>(
    []
  );
  getOrderData(): Observable<any> {
    return this.orderDataSubject.asObservable();
  }
  constructor(
    private http: HttpClient,
    private toastr: ToastrService,
    private router: Router
  ) {}

  orderPlace(form: any) {
    return this.http.post<any>(CREATE_ORDER_URL, form).pipe(
      tap({
        next: (order: any) => {
          this.orderData = order;
          this.orderDataSubject.next(this.orderData);
          this.toastr.success(`Order created Successfully`, 'Order');
        },
        error: (errorResponse: any) => {
          this.toastr.error(errorResponse.error.message, 'Order Failed');
        },
      })
    );
  }

  cancelOrderItem(orderId: string, productId: string) {
    return this.http
      .put<any>(CANCEL_SPECIFIC_ORDER_URL + orderId, productId)
      .pipe(
        tap({
          next: (order: any) => {
            this.orderData = order;
            this.orderDataSubject.next(this.orderData);
            this.toastr.success(`Order Cancel Successfully`, 'Order');
          },
          error: (errorResponse: any) => {
            this.toastr.error(errorResponse.error.message, 'Order Failed');
          },
        })
      );
  }

  cancelOrder(orderId: string) {
    return this.http.put<any>(CANCEL_ORDER_URL, orderId).pipe(
      tap({
        next: (order: any) => {
          this.orderDataSubject.next(this.orderData);
          this.toastr.success(`Order Cancel Successfully`, 'Order');
        },
        error: (errorResponse: any) => {
          this.toastr.error(errorResponse.error.message, 'Order Failed');
        },
      })
    );
  }

  getOrderDetails(orderId: any) {
    return this.http.get<any>(GET_ORDER_URL + orderId).pipe(
      tap({
        next: (order: any) => {
          this.orderData = order;
          this.orderDataSubject.next(this.orderData);
        },
        error: (errorResponse: any) => {
          this.toastr.error(errorResponse.error.message, 'Order Failed');
        },
      })
    );
  }
  getSpecificOrderDetails(orderId: any) {
    return this.http.get<any>(GET_SPECIFIC_ORDER_URL + orderId).pipe(
      tap({
        next: (order: any) => {
          console.log(order)
          this.orderData = order;
          this.orderDataSubject.next(this.orderData);
        },
        error: (errorResponse: any) => {
          this.toastr.error(errorResponse.error.message, 'Order Failed');
        },
      })
    );
  }

  getUserOrderDetails() {
    return this.http.get<any>(GET_ORDER_URL).pipe(
      tap({
        next: (order: any) => {
          this.orderData = order;
          this.orderDataSubject.next(this.orderData);
        },
        error: (errorResponse: any) => {
          this.toastr.error(errorResponse.error.message, 'Order Failed');
        },
      })
    );
  }
}
