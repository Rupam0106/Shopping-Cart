import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CREATE_PAYMENT_URL } from '../shared/constants/urls';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private http:HttpClient) { }

  makePayment(stripeToken:any):Observable<any>{
    return this.http.post<any>(CREATE_PAYMENT_URL,{token:stripeToken})
  }
}
