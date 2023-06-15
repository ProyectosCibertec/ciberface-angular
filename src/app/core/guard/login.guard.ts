import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const LoginGuard = (redirectRoute: string): CanActivateFn => {
  return () => {
    const router: Router = inject(Router)
    let token = localStorage.getItem("access_token")
    return token !== null ? router.createUrlTree([redirectRoute]) : true
  }
};
