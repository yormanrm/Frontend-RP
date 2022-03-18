import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/core/shared/models/product.model';
import { Vendor } from 'src/app/core/shared/models/vendor.model';
import { CookiesTokenService } from 'src/app/core/shared/services/cookies-token/cookiestoken.service';
import { ProductsService } from 'src/app/core/shared/services/products/products.service';
import { UsersService } from 'src/app/core/shared/services/users/users.service';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-products',
    templateUrl: './products.component.html',
    styleUrls: ['./products.component.scss']
})

export class ProductsComponent implements OnInit {
    constructor(private productService:ProductsService, private route : ActivatedRoute,private cookietoken:CookiesTokenService) { }
    products: Product | any;
    page: number = 0;
    imagenes: any = [];
    product_id:any |string;
    ngOnInit() {
        this.loadProducts();
     //   this.loadImages();
    }

    loadProducts(){
        this.productService.getAllProductsOfVendor().subscribe(products =>{
            this.products = products;
            const reader = new FileReader();
            reader.onload =(this.products);
        })
    }

 /*   loadImages(){
        const vendor_id = this.cookietoken.getUser().vend;

       // this.product_id = this.route.snapshot.paramMap.get('id');
        this.productService.listImgVend(vendor_id, this.products.product_id).subscribe(res=>{ this.imagenes = res;
            console.log(res)
            const reader = new FileReader();
            reader.onload = (this.imagenes);
            
        })
        console.log(this.imagenes);
    }*/

    nextPage(){
        if(this.products != null){
            this.page += 5; 
        }
    }
    
    prevPage(){
        if(this.page > 0){
            this.page -=5;
        }
    }
    
    initPage(){
        this.page = 0; 
    }

    deleteProduct(product_id : string){
        this.productService.deleteProduct(product_id).subscribe(result =>{
            if(!result['delete']){
                Swal.fire({
                    title: 'Error Intenta De Nuevo',
                    icon:'error'
                })
            }
            else{
                Swal.fire({
                    title: 'Producto Eliminado',
                    icon:'success'
                }).then(() => {
                    this.reloadPage();
                });
            }
        });
    }

    reloadPage(){
        window.location.reload();
    }

}