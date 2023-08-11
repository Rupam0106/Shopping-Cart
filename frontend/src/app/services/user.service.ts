import { EventEmitter, Injectable } from '@angular/core';
import { User } from '../shared/models/User';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import {
  DELETE_USER_URL,
  FORGOT_USER_URL,
  LOGIN_USER_URL,
  LOGOUT_URL,
  REGISTER_USER_URL,
  RESET_PASSWORD_URL,
  USER_PROFILE_URL,
} from '../shared/constants/urls';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Router } from '@angular/router';
import { IUserLogin } from '../shared/interfaces/IUserLogin';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  invalidUserAuth = new EventEmitter<boolean>(false);
  private userSubject = new BehaviorSubject<User>(
    this.getUserFromLocalStorage()
  );
  public userObservable: Observable<User>;
  constructor(
    private http: HttpClient,
    private toastr: ToastrService,
    private router: Router,
    private cookieService: CookieService
  ) {
    this.userObservable = this.userSubject.asObservable();
  }
  ngOnInit() {}

  userSignUp(userRegiser: any): Observable<User> {
    return this.http.post<User>(REGISTER_USER_URL, userRegiser).pipe(
      tap({
        next: (user: any) => {
          if (user.user.role === 'user') {
            this.setUserToLocalStorage('user', user);
          } else {
            this.setUserToLocalStorage('admin', user);
          }
          this.cookieService.set('refreshToken', user.refreshToken);
          this.userSubject.next(user);
          this.toastr.success(
            `Welcome to the R-Shop ${user.user.name}`,
            'Register Successful'
          );
          this.invalidUserAuth.emit(false);
        },
        error: (errorResponse) => {
          this.toastr.error(errorResponse.error.message, 'Register Failed');
          this.invalidUserAuth.emit(true);
        },
      })
    );
  }

  userLogin(userLogin: IUserLogin): Observable<User> {
    return this.http.post<User>(LOGIN_USER_URL, userLogin).pipe(
      tap({
        next: (user: any) => {
          if (user.user.role === 'user') {
            this.setUserToLocalStorage('user', user);
          } else {
            this.setUserToLocalStorage('admin', user);
          }

          this.userSubject.next(user);
          this.cookieService.set('refreshToken', user.refreshToken);
          this.toastr.success(` Welome ${user.user.name}!`, 'Login Successful');
          this.invalidUserAuth.emit(false);
        },
        error: (errorResponse) => {
          this.toastr.error(errorResponse.error.message, 'Login Failed');
          this.invalidUserAuth.emit(true);
        },
      })
    );
  }
  public get currentUser(): any {
    return this.userSubject.value;
  }

  userReload() {
    if (localStorage.getItem('user') || localStorage.getItem('admin')) {
      this.router.navigate(['/']);
    }
  }

  forgotPassword(email: string) {
    return this.http.post<User>(FORGOT_USER_URL, email).pipe(
      tap({
        next: (user: any) => {
          this.toastr.success(user.message, 'Forgot Password');
          this.router.navigate([`/user/password/reset/${user.resetToken}`]);
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
        next: () => {
          this.toastr.success(
            'Password Updated Successfully',
            'Reset Password'
          );
          this.router.navigate(['/']);
        },
        error: (errorResponse) => {
          console.log(errorResponse);
          this.toastr.error(errorResponse.error.message, 'Reset Failed');
          this.router.navigate(['/user/password/forgot']);
        },
      })
    );
  }

  logout() {
    return this.http.get<User>(LOGOUT_URL).pipe(
      tap({
        next: (user: any) => {
          if (localStorage.getItem('user')) {
            localStorage.removeItem('user');
          } else {
            localStorage.removeItem('admin');
          }
          localStorage.clear();
          this.toastr.success(user.message, 'Logged-out Successful');
          this.cookieService.deleteAll();
          window.location.reload();
          this.router.navigate(['/login']);
        },
        error: (errorResponse) => {
          this.toastr.error(
            errorResponse.error.message,
            'Logged-out Successful Failed'
          );
        },
      })
    );
  }

  getUserDetails() {
    return this.http.get<User>(USER_PROFILE_URL).pipe(
      tap({
        next: () => {},
        error: (errorResponse) => {
          this.toastr.error(
            errorResponse.error.message,
            'Something Wrong Happend'
          );
          this.router.navigate(['/login']);
        },
      })
    );
  }

  deleteUser() {
    return this.http.delete<User>(DELETE_USER_URL).pipe(
      tap({
        next: (user: any) => {
          this.toastr.success(user.message, 'User!');
          localStorage.clear();
          window.location.reload();
          this.router.navigate(['/login']);
        },
        error: (errorResponse) => {
          this.toastr.error(
            errorResponse.error.message,
            'Something Wrong Happend'
          );
        },
      })
    );
  }

  private setUserToLocalStorage(USER_KEY: any, user: User) {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  private getUserFromLocalStorage(): any {
    const userJson = localStorage.getItem('user');
    if (userJson) return JSON.parse(userJson) as User;
    return new User();
  }
}
