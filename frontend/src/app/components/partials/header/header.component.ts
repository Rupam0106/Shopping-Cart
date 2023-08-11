import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CartService } from 'src/app/services/cart.service';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/shared/models/User';

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

  constructor(
    private route: Router,
    private userService: UserService,
    private cartService: CartService
  ) {
    this.cartService.getCartObservable().subscribe((newCart) => {
      this.count = newCart.totalCount;
    })
    userService.userObservable.subscribe((newUser) => {
      this.user = newUser;
    })

    let cart = localStorage.getItem('Cart');
    if (cart) {
      this.count = JSON.parse(cart).cart.totalItems;
    }
    this.cartService.getCartData().subscribe((data: any) => {
      if (data.cart) {
        this.count = data.cart.totalItems;
      }
    });

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
  }

  adminLogout() {
    this.userService.logout().subscribe();
  }

  userLogout() {
    this.userService.logout().subscribe();
  }

  ngOnDestroy() {
    this.getCartDataSub && this.getCartDataSub.unsubscribe();
  }

}
