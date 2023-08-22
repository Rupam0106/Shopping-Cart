import { WishlistService } from './../../../services/wishlist.service';
import { Component } from '@angular/core';
import { ActivatedRoute, TitleStrategy } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent {
  product: any = '';
  loading: any = false;
  outOfStock: any;
  constructor(
    activatedRoute: ActivatedRoute,
    product: ProductsService,
    private cart: CartService,
    private wishlistService: WishlistService
  ) {
    activatedRoute.params.subscribe((params: any) => {
      if (params.id)
        product.getProductById(params.id).subscribe((product: any) => {
          this.product = product.product;
          if (this.product.stock <= 0) {
            this.outOfStock = 'Currently item is not available';
          }
        });
    });
  }
  addToCart() {
    this.cart.addToCart(this.product);
  }

  addToWishList() {
    this.wishlistService.addToWishList(this.product);
  }
}
