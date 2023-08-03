import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from 'src/app/services/products.service';
import { Product } from 'src/app/shared/models/Product';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent {
  product!: Product;
  constructor(activatedRoute: ActivatedRoute, product: ProductsService) {
    activatedRoute.params.subscribe((params: any) => {
      if (params.id)
        product.getProductById(params.id).subscribe((product: any) => {
          this.product = product.product;
        });
    });
  }

  addToCart() {}
}
