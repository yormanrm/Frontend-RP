import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/core/shared/models/product.model';
import { ProductsService } from 'src/app/core/shared/services/products/products.service';

@Component({
    selector: 'app-productsByName',
    templateUrl: './productsByName.component.html',
    styleUrls: ['productsByName.component.scss']
})

export class productsByNameComponent implements OnInit {

    products: Product | any;

    constructor(private productService: ProductsService, private router: Router) { }

    ngOnInit() {
        this.loadProducts();
    }

    loadProducts(){
        this.productService.getAllProducts().subscribe(products => this.products = products);
    }

    allProducts(){
        this.router.navigate(['/allproducts']);
    }
}