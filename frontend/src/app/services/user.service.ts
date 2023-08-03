import { Injectable } from '@angular/core';
import { User } from '../shared/models/User';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import {
  FORGOT_USER_URL,
  LOGIN_USER_URL,
  REGISTER_USER_URL,
  RESET_PASSWORD_URL,
} from '../shared/constants/urls';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Router } from '@angular/router';

const USER_KEY = 'user';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userSubject = new BehaviorSubject<User>(
    this.getUserFromLocalStorage()
  );
  public userObservable: Observable<User>;
  constructor(
    private http: HttpClient,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.userObservable = this.userSubject.asObservable();
  }
  userSignUp(userRegiser: any): Observable<User> {
    return this.http.post<User>(REGISTER_USER_URL, userRegiser).pipe(
      tap({
        next: (user: any) => {
          this.setUserToLocalStorage(user.user);
          this.userSubject.next(user);
          this.toastr.success(
            `Welcome to the R-Shop ${user.user.name}`,
            'Register Successful'
          );
          this.router.navigate(['/']);
        },
        error: (errorResponse) => {
          this.toastr.error(errorResponse.error.message, 'Register Failed');
        },
      })
    );
  }

  userLogin(userLogin: any): Observable<User> {
    return this.http.post<User>(LOGIN_USER_URL, userLogin).pipe(
      tap({
        next: (user: any) => {
          this.setUserToLocalStorage(user.user);
          this.userSubject.next(user);
          this.toastr.success(` Welome ${user.user.name}!`, 'Login Successful');
          this.router.navigate(['/']);
        },
        error: (errorResponse) => {
          this.toastr.error(errorResponse.error.message, 'Login Failed');
        },
      })
    );
  }

  forgotPassword(email: string) {
    return this.http.post<User>(FORGOT_USER_URL, email).pipe(
      tap({
        next: (user: any) => {
          this.toastr.success(user.message, 'Forgot Password');
        },
        error: (errorResponse) => {
          this.toastr.error(
            errorResponse.error.message,
            'Forgot Password Failed'
          );
        },
      })
    );
  }

  resetPassword(resetToken: string, data: string) {
    return this.http.put<User>(RESET_PASSWORD_URL + resetToken, data).pipe(
      tap({
        next: (user: any) => {
          this.toastr.success(
            'Password Updated Successfully',
            'Reset Password'
          );
          this.router.navigate(['/']);
        },
        error: (errorResponse) => {
          console.log(errorResponse);
          this.toastr.error(errorResponse.error.message, 'Reset Failed');
        },
      })
    );
  }

  logout() {
    this.userSubject.next(new User());
    localStorage.removeItem(USER_KEY);
    this.toastr.success(`User`, 'Logged-out Successful');
    window.location.reload();
  }

  private setUserToLocalStorage(user: User) {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  private getUserFromLocalStorage(): User {
    const userJson = localStorage.getItem(USER_KEY);
    if (userJson) return JSON.parse(userJson) as User;
    return new User();
  }
}
