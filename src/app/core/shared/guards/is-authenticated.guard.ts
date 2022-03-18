import { Injectable} from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { CookiesTokenService } from '../services/cookies-token/cookiestoken.service';

@Injectable({
  providedIn: 'root'
})
export class IsAuthenticatedGuard implements CanActivate {
  constructor(private cookietoken: CookiesTokenService, private router: Router){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(!this.cookietoken.isLogged()){
      this.router.navigate([''])
      .then(() => {
        let modalButton : HTMLElement = document.getElementById('modalButton') as HTMLElement;
        modalButton.click();
      });
      return false
    }
    return true;
  }
  
}
