import { Injectable } from '@angular/core';
import { User } from '../shared/models/User';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(
    private http: HttpClient,
    private router: Router,
    private toastr: ToastrService
  ) {}
  userSignUp(user: User) {
    this.http
      .post(
        'https://ecommerce-backend-xp0v.onrender.com/api/v1/user/register',
        user,
        { observe: 'response' }
      )
      .subscribe((result) => {
        if (result) {
          localStorage.setItem('user', JSON.stringify(result.body));
          this.toastr.success('User SignUp Successfully');
          this.router.navigate(['/']);
        }
      });
  }
}
