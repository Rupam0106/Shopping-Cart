import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../shared/models/Product';
import {
  DELETE_PRODUCT_BY_ID_URL,
  PRODUCTS_URL,
  PRODUCT_BY_ID_URL,
  UPDATE_PEODUCT_BY_ID_URL,
} from '../shared/constants/urls';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private http: HttpClient) {}

  getAllProduct() {
    return this.http.get<Product[]>(PRODUCTS_URL);
  }

  getProductById(productId: string) {
    return this.http.get<Product>(PRODUCT_BY_ID_URL + productId);
  }

  updateProduct(product: any) {
    return this.http.put<any>(`${UPDATE_PEODUCT_BY_ID_URL}${product._id}`,product);
  }
  
  deleteProduct(productId: any) {
    return this.http.delete<Product>(DELETE_PRODUCT_BY_ID_URL + productId);
  }
}
