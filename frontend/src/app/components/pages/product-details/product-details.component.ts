import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent {
  product: any='';

  constructor(
    activatedRoute: ActivatedRoute,
    product: ProductsService,
    private cart: CartService
  ) {
    activatedRoute.params.subscribe((params: any) => {
      if (params.id)
        product.getProductById(params.id).subscribe((product: any) => {
          this.product = product.product;
        });
    });
  }

  addToCart() {
    this.cart.addToCart(this.product)
  }
  
}
