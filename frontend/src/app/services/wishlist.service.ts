import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import {
  CREATE_WISH_LIST_URL,
  GET_WISH_LIST_URL,
  UPDATE_WISH_LIST_URL,
} from '../shared/constants/urls';

@Injectable({
  providedIn: 'root',
})
export class WishlistService {
  constructor(private toastr: ToastrService, private http: HttpClient) {}
  wishData: any;

  addToWishList(data: any): void {
    this.http
      .post(CREATE_WISH_LIST_URL, { productId: data._id })
      .subscribe((response: any) => {
        this.wishData = response.wish;
        this.toastr.success(response.msg);
      });
  }

  wishUpdate(data: any) {
    return this.http.put(UPDATE_WISH_LIST_URL, { productId: data });
  }

  getWishData() {
    return this.http.get<any>(GET_WISH_LIST_URL);
  }
}
