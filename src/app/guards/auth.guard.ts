import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserService } from '../services/user.service';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const userService = inject(UserService);

  const token = userService.get('token');
  if (token !== null) {
    return true;
  } else {
    alert('Please log in...');
    router.navigate(['']);
    return false;
  }
};
