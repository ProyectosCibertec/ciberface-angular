import { CanActivateFn } from '@angular/router';

export const AuthGuard: CanActivateFn = (route, state) => {
  let token = localStorage.getItem("access_token")
  return token !== null ? true : false
};
