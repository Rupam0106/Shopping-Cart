import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

export const authGuard: CanActivateFn = (route, state) => {
  const service = inject(UserService);
  if (localStorage.getItem('user')) {
    return true;
  }

  return service.isUserLoggedIn;
};
