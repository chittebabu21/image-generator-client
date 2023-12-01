import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { environment } from 'src/environments/environment';

export const adminGuard: CanActivateFn = (route, state) => {
  // inject the required modules
  const router = inject(Router);
  const userService = inject(UserService);

  // get user by id
  const adminId = userService.get('user');
  const parsedId = JSON.parse(adminId);
  console.log(parsedId);

  // check if user is admin
  if (parsedId === environment.adminId) {
    return true;
  } else {
    alert('Only admin can access this page...');
    localStorage.clear();
    router.navigate(['/']);
    return false;
  }
};
