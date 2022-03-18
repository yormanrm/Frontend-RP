import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/core/shared/services/cart/cart.service';
import { CookiesTokenService } from 'src/app/core/shared/services/cookies-token/cookiestoken.service';

@Component({
    selector: 'app-cart',
    templateUrl: './cart.component.html',
    styleUrls: ['./cart.component.scss']
})

export class CartComponent implements OnInit {
    constructor(private cookietoken: CookiesTokenService, private cartService: CartService) { }
    totalitems!:number;
    numberBadge!: string;
    ngOnInit() {
        this.loadCartItems();
    }

    loadCartItems(){
      if(this.cookietoken.isLogged()){
        if(this.cookietoken.getUser().vend != null){
          this.cartService.getCartVendor().subscribe(cartItems => {
            this.totalitems = cartItems.length;
            if(this.totalitems > 9){
              this.numberBadge = '+9';
            }
            else{
              this.numberBadge = this.totalitems.toString();
            }
          });
        }
        if(this.cookietoken.getUser().cust != null){
          this.cartService.getCartCustomer().subscribe(cartItems => {
            this.totalitems = cartItems.length;
            if(this.totalitems > 9){
              this.numberBadge = '+9';
            }
            else{
              this.numberBadge = this.totalitems.toString();
            }
          });
        }
      }
    }

        /*if(this.cookietoken.getUser().cust === null && this.cookietoken.getUser().vend ===null){
          this.cartItems = null;
          let modalButton : HTMLElement = document.getElementById('modalButton') as HTMLElement;
          modalButton.click();
          const Toast = Swal.mixin({
              toast: true,
              position: 'top-end',
              showConfirmButton: false,
              timer: 3000,
              didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
              }
            })
            
            Toast.fire({
              icon: 'warning',
              title: 'Inicia Sesion Para Usar El Carrito'
            })
        }*/

}