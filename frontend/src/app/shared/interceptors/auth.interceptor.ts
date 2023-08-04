import { UserService } from 'src/app/services/user.service';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private user: UserService,
    private cookieService: CookieService
  ) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const user = this.user.currentUser;
    console.log(user);
    if (user) {
      request = request.clone({
        setHeaders: {
          refreshToken: this.cookieService.get('refreshToken'),
        },
      });
    }

    return next.handle(request);
  }
}
