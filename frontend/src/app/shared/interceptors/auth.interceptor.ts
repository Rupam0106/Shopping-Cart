import { UserService } from 'src/app/services/user.service';
import { Injectable } from '@angular/core';
import { catchError, switchMap } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpClient,
} from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { REFREASH_TOKEN_URL } from '../constants/urls';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private http: HttpClient,
    private user: UserService,
    private cookieService: CookieService,
    private toastr: ToastrService
  ) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const user = this.user.currentUser;
    if (user) {
      request = request.clone({
        setHeaders: {
          authorization: this.cookieService.get('refreshToken'),
        },
      });
    }

    return next.handle(request).pipe(
      catchError((err) => {
        if (err.status === 500) {
          this.user.logout().subscribe();
          localStorage.clear();
        }
        if (err.status === 401 || err.status === 409) {
        } else if (err.status === 404 || err.status === 400) {
          this.toastr.error(err.error.message);
        }
        // else if (err.error.message == 'TokenExpired') {
        // return this.http.post(REFREASH_TOKEN_URL, {}).pipe(
        //   switchMap((res: any) => {
        //     console.log(res);
        //     return next.handle(
        //       request.clone({
        //         setHeaders: {
        //           authorization: this.cookieService.get('refreshToken'),
        //         },
        //       })
        //     );
        //   })
        // );
        // }
        const error = err.error.message || err.statusText;
        return throwError(error);
      })
    );
  }
}
