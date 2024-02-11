import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';

export const notAuthGuard: CanActivateFn = (route, state) => {
  const authService : AuthService = inject(AuthService);
  const router : Router = inject(Router);
  
  if (authService.isAuthenticated()) {
    router.navigate([router.url]);
    return false;
  } else {
    return true;
  }
};
