import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../shared/models/Product';
import { PRODUCTS_URL } from '../shared/constants/urls';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private http: HttpClient) {}

  getAllProduct() {
    return this.http.get<Product[]>(PRODUCTS_URL);
  }
}
