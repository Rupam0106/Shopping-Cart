import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Observable } from 'rxjs';
import {
  CREATE_WISH_LIST_URL,
  GET_WISH_LIST_URL,
  UPDATE_LOCAL_WISH_LIST_URL,
  UPDATE_WISH_LIST_URL,
} from '../shared/constants/urls';

@Injectable({
  providedIn: 'root',
})
export class WishlistService {
  constructor(private toastr: ToastrService, private http: HttpClient) {}

  wishData: any;

  private wishDataSubject: BehaviorSubject<any[]> = new BehaviorSubject<any[]>(
    <any>[]
  );

  getwishData(): Observable<any> {
    return this.wishDataSubject.asObservable();
  }

  getUserwish(): void {
    let wish = localStorage.getItem('wish');
    if (!localStorage.getItem('token')) {
      if (wish) {
        this.wishData = JSON.parse(wish);
        localStorage.setItem('wish', JSON.stringify(this.wishData));
        this.toastr.success('Product Added');
        return this.wishDataSubject.next(this.wishData);
      } else {
        return this.wishDataSubject.next(this.wishData);
      }
    } else {
      this.http.get(GET_WISH_LIST_URL).subscribe((response: any) => {
        this.wishData = response.wish;
        this.wishDataSubject.next(this.wishData);
        localStorage.setItem('wish', JSON.stringify(this.wishData));
      });
    }
  }

  storeLocalwish() {
    let wish = localStorage.getItem('wish');
    if (wish) {
      wish = JSON.parse(wish);
      this.http
        .put(UPDATE_LOCAL_WISH_LIST_URL, this.wishData)
        .subscribe((response: any) => {
          this.wishData = response.wish;
          localStorage.setItem('wish', JSON.stringify(this.wishData));
          return this.wishDataSubject.next(this.wishData);
        });
    }
  }

  addToWishList(data: any): void {
    if (!localStorage.getItem('token')) {
      let wish = localStorage.getItem('wish');
      if (wish) {
        let localwish = JSON.parse(wish);
        let wishItemIndex = localwish.wishItems.findIndex(
          (x: any) => x.productId._id == data._id
        );

        //  IF ITEM IS ALREADY PRESENT IN A wish
        if (wishItemIndex >= 0) {
          let product = localwish.wishItems[wishItemIndex];
          product.quantity += 1;
          localwish.totalItems += 1;
          localwish.totalPrice += product.productId.price;
          this.wishData = localwish;
          localStorage.setItem('wish', JSON.stringify(this.wishData));
          return this.wishDataSubject.next(this.wishData);
        }

        //  IF ITEM IS NOT PRESENT IN A wish
        else {
          this.wishData = {
            wishItems: [
              ...localwish.wishItems,
              { productId: data, quantity: 1 },
            ],
            totalItems: localwish.totalItems + 1,
            totalPrice: localwish.totalPrice + data.price,
          };
          localStorage.setItem('wish', JSON.stringify(this.wishData));
          this.toastr.success('product added to wish');
          return this.wishDataSubject.next(this.wishData);
        }
      }

      //  IF ITEM IS NOT PRESENT IN A LOCAL_STORAGE
      else {
        this.wishData = {
          wishItems: [{ productId: data, quantity: 1 }],
          totalItems: 1,
          totalPrice: data.price,
        };
        localStorage.setItem('wish', JSON.stringify(this.wishData));
        this.toastr.success('product added to wish');
        return this.wishDataSubject.next(this.wishData); // Emit
      }
    }

    //  IF USER IS LOGGED IN
    else {
      this.http
        .post(CREATE_WISH_LIST_URL, { productId: data._id })
        .subscribe((response: any) => {
          this.wishData = response.wish;
          this.wishDataSubject.next(this.wishData);
          localStorage.setItem('wish', JSON.stringify(this.wishData));
          this.toastr.success(response.msg);
        });
    }
  }

  //UPDATE HTE EXITING-CARD
  wishUpdate(data: any, quantity: number): void {
    if (!localStorage.getItem('token')) {
      let wish = localStorage.getItem('wish');
      if (wish) {
        let localwish = JSON.parse(wish);
        let wishItemIndex = localwish.wishItems.findIndex(
          (x: any) => x.productId._id == data
        );
        // INDEX PRODUCT IN wishITEMS
        let product = localwish.wishItems[wishItemIndex];
        // REMOVE ITEM BY USER
        if (quantity < 1) {
          localwish.totalPrice -= product.quantity * product.productId.price;
          localwish.totalItems -= product.quantity;
          localwish.wishItems.splice(wishItemIndex, 1);
          this.wishData = localwish;
          localStorage.setItem('wish', JSON.stringify(localwish));
          return this.wishDataSubject.next(localwish);
        }
        // IF USER INCREASE THE QUANTITY
        else if (quantity > product.quantity) {
          product.quantity += 1;
          localwish.totalItems += 1;
          localwish.totalPrice += product.productId.price;
          this.wishData = localwish;
          localStorage.setItem('wish', JSON.stringify(localwish));
          return this.wishDataSubject.next(localwish);
        }

        // IF USER DECREASE THE QUANTITY
        else if (quantity < product.quantity) {
          product.quantity -= 1;
          localwish.totalItems -= 1;
          localwish.totalPrice -= product.productId.price;
          this.wishData = localwish;
          localStorage.setItem('wish', JSON.stringify(localwish));
          return this.wishDataSubject.next(localwish);
        }
      }
    }

    // IF USER LOGGED IN
    else {
      this.http
        .put(UPDATE_WISH_LIST_URL, { productId: data, quantity })
        .subscribe(
          (response: any) => {
            this.wishData = response.wish;
            this.wishDataSubject.next(this.wishData);
            this.toastr.success(response.msg);
            localStorage.setItem('wish', JSON.stringify(this.wishData));
          },
          (error) => {
            console.log(error);
            this.toastr.error(error.error.msg, 'Out Of Stock');
          }
        );
    }
  }
}
