import { ProductsService } from 'src/app/services/products.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
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
  cartItems: number = 0;
  constructor(private route: Router, private userService: UserService) {
    if (localStorage.getItem('user')) {
      let userStore = localStorage.getItem('user');
      let userData = userStore && JSON.parse(userStore);
      this.user = userData.role;
      this.menuType = 'user';
    } else if (localStorage.getItem('admin')) {
      let adminStore = localStorage.getItem('admin');
      let userData = adminStore && JSON.parse(adminStore);
      this.admin = userData.role;
      this.menuType = 'admin';
    } else {
      this.menuType = 'default';
    }
  }

  ngOnInit() {}

  adminLogout() {
    this.userService.logout();
  }

  userLogout() {
    this.userService.logout();
  }
}
