import { Component } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { WishlistService } from 'src/app/services/wishlist.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css'],
})
export class WishlistComponent {
  wishItems: any;
  wishDetails: any;

  constructor(
    private wishService: WishlistService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.wishService.getWishData().subscribe((data: any) => {
      if (data) {
        this.wishItems = data.wishList;
      }
    });
  }

  wishUpdate(productId: string) {
    this.wishService.wishUpdate(productId).subscribe((data: any) => {
      if (data) {
        this.wishItems = data.wishList;
      }
    });
  }

  moveToCart(productId: string) {
    this.cartService.addToCart({ productId });
    this.wishUpdate(productId);
  }
}
