import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/core/shared/models/product.model';
import { ProductsService } from 'src/app/core/shared/services/products/products.service';
import Swal from 'sweetalert2';

interface Category {
    value: string;
    viewValue: string;
}

@Component({
    selector: 'app-editproduct',
    templateUrl: './editproduct.component.html',
    styleUrls: ['./editproduct.component.scss']
})

export class EditproductComponent implements OnInit {
    constructor(private productService: ProductsService, private route: ActivatedRoute, private fb: FormBuilder, private router: Router) { }
    currentProduct: Product | any;
    productID: string | any;

    categories: Category[] = [
        {value: 'Accesorios de Telefonia y Tablets', viewValue: 'Accesorios de Telefonia y Tablets'},
        {value: 'Accesorios y Perifericos Computacionales', viewValue: 'Accesorios y Perifericos Computacionales'},
        {value: 'Audifonos y Bocinas', viewValue: 'Audifonos y Bocinas'},
        {value: 'Automotriz y Refacciones', viewValue: 'Automotriz y Refacciones'},
        {value: 'Belleza y Cuidado Personal', viewValue: 'Belleza y Cuidado Personal'},
        {value: 'Calzado', viewValue: 'Calzado'},
        {value: 'Celulares', viewValue: 'Celulares'},
        {value: 'Cocina y Electrodomesticos', viewValue: 'Cocina y Electrodomesticos'},
        {value: 'Computadoras', viewValue: 'Computadoras'},
        {value: 'Electronica', viewValue: 'Electronica'},
        {value: 'Ferreteria y Mejoras Del Hogar', viewValue: 'Ferreteria y Mejoras Del Hogar'},
        {value: 'Fiestas', viewValue: 'Fiestas'},
        {value: 'Juguetes', viewValue: 'Juguetes'},
        {value: 'Linea Blanca', viewValue: 'Linea Blanca'},
        {value: 'Maletas y Mochilas', viewValue: 'Maletas y Mochilas'},
        {value: 'Mascotas', viewValue: 'Mascotas'},
        {value: 'Materia Prima', viewValue: 'Materia Prima'},
        {value: 'Muebleria', viewValue: 'Muebleria'},
        {value: 'Ropa Para Caballero', viewValue: 'Ropa Para Caballero'},
        {value: 'Ropa Para Dama', viewValue: 'Ropa Para Dama'},
        {value: 'Ropa Para Niño', viewValue: 'Ropa Para Niño'},
        {value: 'Ropa Para Niña', viewValue: 'Ropa Para Niña'},
        {value: 'Ropa Para Bebe', viewValue: 'Ropa Para Bebe'},
        {value: 'Salud', viewValue: 'Salud'},
        {value: 'Servicio', viewValue: 'Servicio'},
        {value: 'Tablets', viewValue: 'Tablets'},
        {value: 'Videojuegos y Consolas', viewValue: 'Videojuegos y Consolas'},
        {value: 'Otros', viewValue: 'Otros'},
    ];

    updateProductForm : FormGroup | any;

    ngOnInit() { 
        this.productID = this.route.snapshot.paramMap.get('id');
        this.loadCurrentProduct();
        this.updateProductForm = this.fb.group ({
            product_id: this.productID,
            product_name: ['', Validators.required ],
            description: ['', Validators.required ],
            price: ['', Validators.required ],
            brand: ['', Validators.required ],
            quantity: ['', Validators.required ],
            category: ['', Validators.required ],
        });
    }

    loadCurrentProduct(){
        this.productService.getProduct(this.productID).subscribe(res=>{
            this.currentProduct = res[0];
        });
    }

    updateProduct(){
        this.productService.updateProduct(this.updateProductForm.value).subscribe(result =>{
            if(!result['update']){
                Swal.fire({
                    title: 'No Se Detecto Ningun Cambio',
                    icon:'error'
                })
            }
            else{
                Swal.fire({
                    title: 'Producto Actualizado!',
                    icon:'success'
                }).then(() => {
                    this.router.navigate(['/account-vendor/products']);
                });
            }
        });
    }

    reloadPage(){
        window.location.reload();
    }
}