import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, tap } from 'rxjs';
import { ADD_PRODUCT_URL } from '../shared/constants/urls';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  invalidUserAuth = new EventEmitter<boolean>(false);
  constructor(
    private http: HttpClient,
    private toastr: ToastrService,
    private router: Router
  ) {
    
  }

  addProduct(addProduct: any): Observable<any> {
    return this.http.post<any>(ADD_PRODUCT_URL, addProduct).pipe(
      tap({
        next: (product: any) => {
          console.log(product);
          this.toastr.success(` Product Added Successfully`, 'Product!');
          this.router.navigate(['/']);
        },
        error: (errorResponse: any) => {
          this.toastr.error(errorResponse.error.message, 'Product Failed');
        },
      })
    );
  }
}
