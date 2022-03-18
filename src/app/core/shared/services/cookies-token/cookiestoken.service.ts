import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { CredentialUser } from '../../models/credentialsUser.model';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';


@Injectable({
  providedIn: 'root'
})

export class CookiesTokenService {

  helper = new JwtHelperService();

  currentUser: CredentialUser = {
    cred: null,
    vend: null,
    cust: null,
    role: null,
  }



  constructor(private cookies: CookieService, private router: Router) { }

  setToken(token: string) {
    this.cookies.set("token", token);
  }

  getToken() {
    return this.cookies.get("token");
  }

  getUser(){
    const decodedToken = this.helper.decodeToken(this.cookies.get("token"));
    this.currentUser.cred = decodedToken.data.cred;
    this.currentUser.vend = decodedToken.data.vend;
    this.currentUser.cust = decodedToken.data.cust;
    this.currentUser.role = decodedToken.data.role;
    return this.currentUser;
  }

  isLogged(){
    if(this.cookies.get("token")){
      return true;
    }else{
      return false;
    }
  }

  deleteCookie(){
    this.cookies.deleteAll();
    this.router.navigate([''])
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 1000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    });
    Toast.fire({
      title: 'Adios'
    })
    .then(() => {
      this.reloadPage();
    });
  }

  reloadPage(){
    window.location.reload();
  }

}