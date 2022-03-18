import { Component, OnInit } from '@angular/core';
import { Purchase } from 'src/app/core/shared/models/purchase.model';
import { CartService } from 'src/app/core/shared/services/cart/cart.service';

@Component({
    selector: 'app-shoppinghistory',
    templateUrl: './shoppinghistory.component.html',
    styleUrls: ['./shoppinghistory.component.scss']
})

export class ShoppinghistoryComponent implements OnInit {
    constructor(private cartService: CartService) { }
    purchases: Purchase | any;
    ngOnInit() { 
        this.cartService.getPurchasesCustomer().subscribe(purchases =>  {this.purchases = purchases})
    }
    
}