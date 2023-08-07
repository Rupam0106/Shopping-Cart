import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

export const adminAuthGuard: CanActivateFn = (route, state) => {
  const service = inject(UserService);
  if (localStorage.getItem('admin') || localStorage.getItem('user')) {
    return true;
  }

  return service.invalidUserAuth;
};
