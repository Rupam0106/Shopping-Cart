import { ActivatedRoute, Router } from '@angular/router';
import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  returnUrl = '';
  constructor(
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private cartService:CartService
  ) {
    this.userService.userReload();
  }

  loginUser(data: any) {
    this.userService
      .userLogin({ email: data.email, password: data.password })
      .subscribe(() => {
        this.router.navigateByUrl(this.returnUrl);
        
      });
  }
  ngOnInit() {
    this.returnUrl = this.activatedRoute.snapshot.queryParams['returnUrl'];
  }

  gestLogin(){
    this.cartService.storeLocalCart();
  }
}
