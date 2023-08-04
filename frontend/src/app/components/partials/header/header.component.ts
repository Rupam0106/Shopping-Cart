import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  menuType: string = 'default';
  admin: string = '';
  user: string = '';
  cartItems: number = 0;
  constructor(
    private route: Router,
    private userService: UserService,
    private cart: CartService
  ) {
    if (localStorage.getItem('user')) {
      let userStore = localStorage.getItem('user');
      let userData = userStore && JSON.parse(userStore);
      this.user = userData.name;
      this.menuType = 'user';
    } else if (localStorage.getItem('admin')) {
      let adminStore = localStorage.getItem('admin');
      let userData = adminStore && JSON.parse(adminStore);
      this.admin = userData.name;
      this.menuType = 'admin';
    } else {
      this.menuType = 'default';
    }
  }

  ngOnInit() {
    let cartData = localStorage.getItem('localCart');
    if (cartData) {
      this.cartItems = JSON.parse(cartData).length;
    }
    this.cart.cartData.subscribe((items) => {
      this.cartItems = items.length;
    });
  }

  adminLogout() {
    this.userService.logout().subscribe();
  }

  userLogout() {
    this.userService.llogout()
  }
}
