import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { ProductsService } from 'src/app/services/products.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  returnUrl = '';
  constructor(
    private user: UserService,
    private product: ProductsService,
    private cart: CartService
  ) {}
  loginUser(data: any) {
    this.user
      .userLogin({ email: data.email, password: data.password })
      .subscribe();
      this.localCartToRemoteCart()
  }

  ngOnInit() {
    this.user.userReload();
    // this.returnUrl = this.activatedRoute.snapshot.queryParams.returnUrl;
  }

  localCartToRemoteCart() {
    let data = localStorage.getItem('localCart');
    let user = localStorage.getItem('user');
    let userId = user && JSON.parse(user).id;
    if (data) {
      let cartDataList: any[] = JSON.parse(data);
      cartDataList.forEach((product: any, index) => {
        let cartData: any = {
          ...product,
          productId: product.id,
          userId,
        };
        delete cartData.id;

        this.cart.addToCart(cartData).subscribe((result) => {
          if (result) {
            console.warn('data is stored in DB');
          }
        });
        if (cartDataList.length === index + 1) {
          localStorage.removeItem('localCart');
        }
      });
    }
    this.product.getProductById(userId);
  }
}
