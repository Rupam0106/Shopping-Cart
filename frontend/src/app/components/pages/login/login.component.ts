import { ActivatedRoute } from '@angular/router';
import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  returnUrl = '';
  constructor(
    private user: UserService,
    private activatedRoute: ActivatedRoute
  ) {}
  loginUser(data: any) {
    this.user
      .userLogin({ email: data.email, password: data.password })
      .subscribe();
  }

  ngOnInit() {
    // this.returnUrl = this.activatedRoute.snapshot.queryParams.returnUrl;
  }
}
