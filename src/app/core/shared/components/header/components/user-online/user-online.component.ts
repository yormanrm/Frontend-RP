import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Customer } from 'src/app/core/shared/models/customer.model';
import { Vendor } from 'src/app/core/shared/models/vendor.model';
import { CookiesTokenService } from 'src/app/core/shared/services/cookies-token/cookiestoken.service';
import { UsersService } from 'src/app/core/shared/services/users/users.service';

@Component({
    selector: 'app-user-online',
    templateUrl: './user-online.component.html',
    styleUrls: ['./user-online.component.scss']
})

export class UseronlineComponent implements OnInit {

    currentCustomer: Customer | any;
    currentVendor: Vendor | any;
    roleLogged : string | any;
    nameLogged : string | any;

    constructor(private cookietoken: CookiesTokenService, private router:Router, private userService: UsersService) {}

    ngOnInit() {
        this.roleLogged = this.cookietoken.getUser().role;
        this.loadCurrentUser();
    }

    accountView(){
        if (this.roleLogged == 'Customer') {
            this.router.navigate(['/account/account-home']);
        }
        if (this.roleLogged == 'Vendor') {
            this.router.navigate(['/account-vendor/account-home']);
        }
    }

    loadCurrentUser(){
        if (this.roleLogged == 'Customer') {
            this.userService.getCustomer().subscribe(res=>{
                this.currentCustomer = res[0]; 
                this.nameLogged = this.currentCustomer.names;
            });
        }
        if (this.roleLogged == 'Vendor') {
            this.userService.getVendor().subscribe(res=>{
                this.currentVendor = res[0]; 
                this.nameLogged = this.currentVendor.names;
            });
        }
    }

    logout() : void{
        this.cookietoken.deleteCookie();
    }
}