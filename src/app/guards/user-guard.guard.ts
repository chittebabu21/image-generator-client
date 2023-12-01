import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { UserService } from '../services/user.service';
import { environment } from 'src/environments/environment';

export const userGuardGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const userService = inject(UserService);

  // if token exists
  const token = userService.get('token');
  const adminId = userService.get('user');
  const parsedId = JSON.parse(adminId);
  if (!token) {
    return true;
  } else if (parsedId === environment.adminId) {
    alert('Please log out...');
    router.navigateByUrl('/admin');
    return false;
  } else {
    alert('Please log out...');
    router.navigateByUrl('/home');
    return false;
  }
};
