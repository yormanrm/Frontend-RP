import { Component, OnInit } from '@angular/core';
import { Address } from 'src/app/core/shared/models/address.model';
import { Vendor } from 'src/app/core/shared/models/vendor.model';
import { UsersService } from 'src/app/core/shared/services/users/users.service';

@Component({
    selector: 'app-myaccount',
    templateUrl: './myaccount.component.html',
    styleUrls: ['./myaccount.component.scss']
})

export class MyaccountComponent implements OnInit {

    currentVendor: Vendor | any;
    defaultAddress: Address | any;

    constructor(private userService: UsersService) { }

    ngOnInit() {
        this.loadCurrentUser();
    }

    loadCurrentUser(){
        this.userService.getVendor().subscribe(res=>{
            this.currentVendor = res[0];
            this.userService.getVendorDefaultAddress().subscribe(address =>{
                this.defaultAddress = address[0];
            })
        });
    }
}