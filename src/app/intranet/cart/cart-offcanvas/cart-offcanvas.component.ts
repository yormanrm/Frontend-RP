import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { cartItemCustomer } from 'src/app/core/shared/models/cart-item-customer.model';
import { cartItemVendor } from 'src/app/core/shared/models/cart-item-vendor.model';
import { CartService } from 'src/app/core/shared/services/cart/cart.service';
import { CookiesTokenService } from 'src/app/core/shared/services/cookies-token/cookiestoken.service';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-cartoffcanvas',
    templateUrl: './cart-offcanvas.component.html',
    styleUrls: ['./cart-offcanvas.component.scss']
})

export class CartoffcanvasComponent implements OnInit {
    constructor(private cookietoken: CookiesTokenService, private cartService: CartService, private router: Router) { }
    cartItemsVendor: cartItemVendor | any;
    cartItemsCustomer: cartItemCustomer | any;
    allitems!:number;
    totalpay:string = '';
    isLogged: boolean | any;
    roleLogged: string | any;

    ngOnInit() { 
        this.loadCartItems();
        this.isLogged = this.cookietoken.isLogged();
    }

    loadCartItems(){
      if(this.cookietoken.isLogged()){
        if(this.cookietoken.getUser().vend != null){
          this.roleLogged = this.cookietoken.getUser().role;
          this.cartService.getCartVendor().subscribe(cartItems => {
            this.cartItemsVendor = cartItems;
            const reader = new FileReader();
            reader.onload =(this.cartItemsVendor);
            this.allitems = cartItems.length;
            let Total = 0;
            this.cartItemsVendor.map((a:any)=>{
             Total += parseInt(a.total);
            })
            this.totalpay = Total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
          });
        }
        if(this.cookietoken.getUser().cust != null){
          this.roleLogged = this.cookietoken.getUser().role;
          this.cartService.getCartCustomer().subscribe(cartItems => {
            this.cartItemsCustomer = cartItems;
            const reader = new FileReader();
            reader.onload =(this.cartItemsVendor);
            this.allitems = cartItems.length;
            let Total = 0;
            this.cartItemsCustomer.map((a:any)=>{
             Total += parseInt(a.total);
            })
            this.totalpay = Total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
          });
        }
      }
    }

    deleteCartItem(cartitem_id:string){
      if(this.cookietoken.getUser().vend != null){
        this.cartService.deleteCartItemVendor(cartitem_id).subscribe(result =>{
        
            if(!result['delete']){
              Swal.fire({
                title: 'Error Al Agregar, Intenta Nuevamente',
                icon:'error'
              })
            }
            else{
              const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 900,
                didOpen: (toast) => {
                  toast.addEventListener('mouseenter', Swal.stopTimer)
                  toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
              });
              Toast.fire({
                icon: 'error',
                title: 'Eliminado Del Carrito'
              })
              .then(() => {
                this.reloadPage();
              });
            }
          
        })      
      }
      if(this.cookietoken.getUser().cust != null){
        this.cartService.deleteCartItemCustomer(cartitem_id).subscribe(result =>{
        
            if(!result['delete']){
              Swal.fire({
                title: 'Error Al Agregar, Intenta Nuevamente',
                icon:'error'
              })
            }
            else{
              const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 900,
                didOpen: (toast) => {
                  toast.addEventListener('mouseenter', Swal.stopTimer)
                  toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
              });
              Toast.fire({
                icon: 'error',
                title: 'Eliminado Del Carrito'
              })
              .then(() => {
                this.reloadPage();
              });
            }
          
        })        
      }
    }

    goToCheckout(){
      this.router.navigate(['checkout']);
    }


    reloadPage(){
      window.location.reload()
    }
}