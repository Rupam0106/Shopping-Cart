import { ActivatedRoute, Router } from '@angular/router';
import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  showLogin: boolean = false;
  returnUrl = '';
  constructor(
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.userService.userReload();
  }

  openGuest() {
    this.showLogin = true;
  }
  openLogin() {
    this.showLogin = false;
  }

  loginUser(data: any) {
    this.userService
      .userLogin({ email: data.email, password: data.password })
      .subscribe(() => {
        this.router.navigateByUrl(this.returnUrl);
      });
  }

  guestLogin(data: any) {
    this.userService
      .guestLogin({ email: data.email, password: data.password })
      .subscribe(() => {
        this.router.navigateByUrl(this.returnUrl);
      });
  }
  ngOnInit() {
    this.returnUrl = this.activatedRoute.snapshot.queryParams['returnUrl'];
  }
}
