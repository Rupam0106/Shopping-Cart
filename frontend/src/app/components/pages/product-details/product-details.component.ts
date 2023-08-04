import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { ProductsService } from 'src/app/services/products.service';
import { Product } from 'src/app/shared/models/Product';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent {
  product!: Product;
  productQuantity: number = 1;
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
    this.cart.addToCart(this.product).subscribe();
  }
  handleQuantity(val: string) {
    if (this.productQuantity < 20 && val === 'plus') {
      this.productQuantity += 1;
    } else if (this.productQuantity > 1 && val === 'min') {
      this.productQuantity -= 1;
    }
  }
}
