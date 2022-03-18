import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Customer } from 'src/app/core/shared/models/customer.model';
import { Vendor } from 'src/app/core/shared/models/vendor.model';
import { AuthService } from 'src/app/core/shared/services/auth/auth.service';
import { CookiesTokenService } from 'src/app/core/shared/services/cookies-token/cookiestoken.service';
import { UsersService } from 'src/app/core/shared/services/users/users.service';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
    form: any = {
        email: null,
        passwd: null
    };

    errorMessage = '';
    currentCustomer: Customer | any;
    currentVendor: Vendor | any;

    nameLogged : string | any;
    roleLogged : string | any;
    
    constructor(private authService: AuthService, private router:Router, private cookietoken: CookiesTokenService, private userService: UsersService) { }
    
      ngOnInit(): void {
      }
    
      login(): void {
        const { email, passwd } = this.form;
        this.authService.login(email, passwd).subscribe({
          next: data => {       
            this.cookietoken.setToken(data.token);
            this.roleLogged = this.cookietoken.getUser().role;

            if (this.roleLogged == 'Customer') {
              this.router.navigate(['/account/account-home']);
              this.userService.getCustomer().subscribe(res=>{
                this.currentCustomer = res[0]; 
                this.nameLogged = this.currentCustomer.names;
                const Toast = Swal.mixin({
                  toast: true,
                  position: 'top-end',
                  showConfirmButton: false,
                  timer: 2000,
                  timerProgressBar: true,
                  didOpen: (toast) => {
                    toast.addEventListener('mouseenter', Swal.stopTimer)
                    toast.addEventListener('mouseleave', Swal.resumeTimer)
                  }
                });
                Toast.fire({
                  icon: 'success',
                  title: 'Bienvenido, '+ (this.nameLogged[0].toUpperCase()+this.nameLogged.substr(1).toLowerCase())
                });
              })
            }


            if (this.roleLogged == 'Vendor') {
              this.router.navigate(['/account-vendor/account-home']);
              this.userService.getVendor().subscribe(res=>{
                this.currentVendor = res[0];
                this.nameLogged = this.currentVendor.names;
                const Toast = Swal.mixin({
                  toast: true,
                  position: 'top-end',
                  showConfirmButton: false,
                  timer: 2000,
                  timerProgressBar: true,
                  didOpen: (toast) => {
                    toast.addEventListener('mouseenter', Swal.stopTimer)
                    toast.addEventListener('mouseleave', Swal.resumeTimer)
                  }
                });
                Toast.fire({
                  icon: 'success',
                  title: 'Bienvenido, '+ (this.nameLogged[0].toUpperCase()+this.nameLogged.substr(1).toLowerCase())
                });
              });
            }
          },
          error: err => {
            alert("Sesion No Iniciada");
            this.errorMessage = err.error.message;      
          }
        });
      }
  
}