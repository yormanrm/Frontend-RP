import { Component, OnInit } from '@angular/core';
import { Address } from 'src/app/core/shared/models/address.model';
import { Customer } from 'src/app/core/shared/models/customer.model';
import { UsersService } from 'src/app/core/shared/services/users/users.service';

@Component({
    selector: 'app-myaccount',
    templateUrl: './myaccount.component.html',
    styleUrls: ['./myaccount.component.scss']
})

export class MyaccountComponent implements OnInit {

    currentCustomer: Customer | any;
    defaultAddress: Address | any;

    constructor(private userService: UsersService) { }

    ngOnInit() {
        this.loadCurrentUser();
    }

    loadCurrentUser(){
        this.userService.getCustomer().subscribe(res=>{
            this.currentCustomer = res[0];
            this.userService.getCustomerDefaultAddress().subscribe(address =>{
                this.defaultAddress = address[0];
            })
        });
    }
}