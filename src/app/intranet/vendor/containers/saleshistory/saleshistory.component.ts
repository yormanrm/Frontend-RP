import { Component, OnInit } from '@angular/core';
import { cartItemCustomer } from 'src/app/core/shared/models/cart-item-customer.model';
import { cartItemVendor } from 'src/app/core/shared/models/cart-item-vendor.model';
import { CartService } from 'src/app/core/shared/services/cart/cart.service';

@Component({
    selector: 'app-saleshistory',
    templateUrl: './saleshistory.component.html',
    styleUrls: ['./saleshistory.component.scss']
})

export class SalesComponent implements OnInit {
    constructor(private cartService:CartService) { }
    salesCustomer : cartItemCustomer | any;
    salesVendor : cartItemVendor | any;
    ngOnInit() { 
        this.cartService.getSalesToCustomers().subscribe(salesc =>{this.salesCustomer = salesc});
        this.cartService.getSalesToVendors().subscribe(salesv =>{this.salesVendor = salesv})
    }

}