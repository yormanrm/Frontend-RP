import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/core/shared/models/product.model';
import { CartService } from 'src/app/core/shared/services/cart/cart.service';
import { CookiesTokenService } from 'src/app/core/shared/services/cookies-token/cookiestoken.service';
import { LoadScriptsService } from 'src/app/core/shared/services/load-scripts/load-scripts.service';
import { ProductsService } from 'src/app/core/shared/services/products/products.service';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-viewproduct',
    templateUrl: 'view-product.component.html',
    styleUrls:['view-product.component.scss']

})

export class ViewproductComponent implements OnInit {
    constructor(private route : ActivatedRoute, private productService : ProductsService, private loadScript:LoadScriptsService, private http: HttpClient, private cookietoken:CookiesTokenService, private fb:FormBuilder, private cartService: CartService) {
      loadScript.loadS(["changeimg/change"]);
    }
    product : Product | any;
    product_id: string | any;
    title = 'fileUpload';
    images = '';
    //imgURL = '/assets/noimage.png';
    multipleImages = [];
    imagenes: any = [];

    cartCustomerForm: FormGroup | any;
    cartVendorForm: FormGroup | any;

    ngOnInit() { 
        this.product_id = this.route.snapshot.paramMap.get('id');
        this.productService.getProduct(this.product_id).subscribe(res=> this.product = res[0]);
        this.productService.showImg(this.product_id).subscribe(res=>{ this.imagenes = res;
            const reader = new FileReader();
            reader.onload = (this.imagenes);
            console.log(this.imagenes);})
    }

    
    addCart(product_id:string, seller:string, quantity:string){

        if(!this.cookietoken.isLogged()){
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
                title: 'Inicia Sesion Para Agregar Productos Al Carrito'
              })
        }


        if(this.cookietoken.getUser().cust != null){
            this.cartCustomerForm = this.fb.group ({
                cust_id: this.cookietoken.getUser().cust,
                product_id: product_id,
                seller_id: seller,
                quantity: quantity
            });
            this.cartService.insertCartItemCustomer(this.cartCustomerForm.value).subscribe(result =>{
                if(!result['insertcartitem']){
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
                        timer: 2500,
                        didOpen: (toast) => {
                          toast.addEventListener('mouseenter', Swal.stopTimer)
                          toast.addEventListener('mouseleave', Swal.resumeTimer)
                        }
                      });
                      Toast.fire({
                        icon: 'success',
                        title: 'Producto Agregado. Podras Cambiar La Cantidad En El Checkout'
                      })
                      .then(() => {
                        this.reloadPage();
                      });
                }
            });
        }
        if(this.cookietoken.getUser().vend != null){
            this.cartVendorForm = this.fb.group ({
                vendor_id: this.cookietoken.getUser().vend,
                product_id: product_id,
                seller_id: seller,
                quantity: quantity
            });
            this.cartService.insertCartItemVendor(this.cartVendorForm.value).subscribe(result =>{
                if(!result['insertcartitem']){
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
                        timer: 2500,
                        didOpen: (toast) => {
                          toast.addEventListener('mouseenter', Swal.stopTimer)
                          toast.addEventListener('mouseleave', Swal.resumeTimer)
                        }
                      });
                      Toast.fire({
                        icon: 'success',
                        title: 'Producto Agregado. Podras Cambiar La Cantidad En El Checkout'
                      })
                      .then(() => {
                        this.reloadPage();
                      });
                }
            });
        }

    }

    reloadPage(){
        window.location.reload();
    }
}