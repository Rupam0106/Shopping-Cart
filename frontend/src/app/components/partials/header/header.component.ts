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
  user: string = '';
  count: number = 0;
  getCartDataSub!: Subscription;
  open:boolean = false

  constructor(
    private route: Router,
    private userService: UserService,
    private cartService: CartService
  ) {
    let cart = localStorage.getItem('cart');
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
    let cartData = localStorage.getItem('localCart');
    if (cartData) {
      this.count = JSON.parse(cartData).length;
    }
  }

  adminLogout() {
    this.userService.logout().subscribe();
  }

  userLogout() {
    this.userService.logout().subscribe();
  }

  getCartData() {
    this.getCartDataSub = this.cartService.getUserCartData().subscribe();
  }
  ngOnDestroy() {
    this.getCartDataSub && this.getCartDataSub.unsubscribe();
  }

  show(){
    this.open = true
  }
  hide(){
    this.open = false
  }
}
