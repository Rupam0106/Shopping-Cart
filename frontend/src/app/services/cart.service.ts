import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { CREATE_CART_URL } from '../shared/constants/urls';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cartData = new EventEmitter<any[] | []>();
  private cartDataSubject: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  public cartObservable: Observable<any>;
  constructor(
    private http: HttpClient,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.cartObservable = this.cartDataSubject.asObservable();
  }

  addToCart(data: any) {
    return this.http.post<any>(CREATE_CART_URL, data).pipe(
      tap({
        next: (cart: any) => {
          this.cartDataSubject.next(cart);
          this.toastr.success(`Item Added into Cart ${cart.name}`, 'Cart');
          this.router.navigate(['/user/cart/create']);
        },
        error: (errorResponse) => {
          this.toastr.error(errorResponse.error.message, 'Cart Failed');
        },
      })
    );
  }

  localAddToCart(data: any[]) {
    let cartData = [];
    let localCart = localStorage.getItem('localCart');
    if (!localCart) {
      localStorage.setItem('localCart', JSON.stringify([data]));
      this.cartData.emit([data]);
    } else {
      cartData = JSON.parse(localCart);
      cartData.push(data);
      localStorage.setItem('localCart', JSON.stringify(cartData));
      this.cartData.emit(cartData);
    }
  }
}
