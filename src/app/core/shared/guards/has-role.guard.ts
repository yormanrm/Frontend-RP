import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { CookiesTokenService } from '../services/cookies-token/cookiestoken.service';
@Injectable({
  providedIn: 'root',
})
export class HasRoleGuard implements CanActivate {
  constructor(private cookietoken: CookiesTokenService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const isAuthorized = this.cookietoken.getUser()?.role.includes(route.data['role']);

    if (!isAuthorized) {
      window.alert('you are not authorized');
    }

    return isAuthorized || false;
  }
}