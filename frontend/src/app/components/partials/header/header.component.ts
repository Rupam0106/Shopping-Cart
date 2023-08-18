import { OrderService } from './../../../services/order.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CartService } from 'src/app/services/cart.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  menuType: string = 'default';
  admin: string = '';
  user: any = '';
  count: number = 0;
  getCartDataSub!: Subscription;
  order: any;
  constructor(
    private route: Router,
    private userService: UserService,
    private cartService: CartService,
    private orderService: OrderService
  ) {
    let cart = localStorage.getItem('cart');
    if (cart) {
      this.count = JSON.parse(cart).totalItems;

      this.cartService.getCartData().subscribe((data: any) => {
        if (data.totalItems) {
          this.count = data.totalItems;
        }
      });
    } else {
      this.cartService.getCartData().subscribe((data: any) => {
        if (data) {
          this.count = data.totalItems;
        }
      });
    }

    this.route.events.subscribe((val: any) => {
      if (localStorage.getItem('user')) {
        let userStore = localStorage.getItem('user');
        let userData = userStore && JSON.parse(userStore);
        this.user = userData.user.name;
        this.menuType = 'user';
      } else if (localStorage.getItem('admin')) {
        let adminStore = localStorage.getItem('admin');
        let userData = adminStore && JSON.parse(adminStore);
        this.admin = userData.user.name;
        this.menuType = 'admin';
      } else {
        this.menuType = 'default';
      }
    });
  }

  ngOnInit() {
    this.cartService.getCartData().subscribe((data: any) => {
      if (data.totalItems) {
        this.count = data.totalItems;
      }
    });
  }

  adminLogout() {
    this.userService.logout().subscribe();
  }

  userLogout() {
    this.count = 0;
    this.userService.logout().subscribe();
  }

  ngOnDestroy() {
    this.getCartDataSub && this.getCartDataSub.unsubscribe();
  }
}
