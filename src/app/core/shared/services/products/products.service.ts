import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookiesTokenService } from '../cookies-token/cookiestoken.service';


@Injectable({providedIn: 'root'})
export class ProductsService {
    url = 'http://localhost:3000';
    constructor(private http: HttpClient, private cookietoken:CookiesTokenService) { }

    insertProduct(product:any): Observable<any>{ 
        return this.http.post(`http://localhost/Backend_RP/api php/routes-products/insertProduct.php`,JSON.stringify(product));
    }
    getAllProducts(): Observable<any>{ 
        return this.http.get(`http://localhost/Backend_RP/api php/routes-products/getProductsGeneral.php`);
    }
    getAllProductsOfVendor(): Observable<any>{ 
        const vendor_id = this.cookietoken.getUser().vend;
        return this.http.get(`http://localhost/Backend_RP/api php/routes-products/getProductsVendor.php?id=`+ vendor_id);
    }
    getAllProductsOfBusiness(vendor_id:string): Observable<any>{ 
        return this.http.get(`http://localhost/Backend_RP/api php/routes-products/getProductsVendor.php?id=`+ vendor_id);
    }
    getProduct(product_id:string): Observable<any>{ 
        return this.http.get(`http://localhost/Backend_RP/api php/routes-products/getProductsGeneral.php?id=`+ product_id);
    }
    updateProduct(product:any): Observable<any>{
        return this.http.put(`http://localhost/Backend_RP/api php/routes-products/updateProduct.php`, JSON.stringify(product));
    }
    deleteProduct(product_id:string): Observable<any>{ 
        return this.http.delete(`http://localhost/Backend_RP/api php/routes-products/delete.php?id=`+product_id);
    }
    showImg(product_id:string):Observable<any>{
       return this.http.get(`http://localhost:3000/listaimagen/`+product_id)
    }

    //Obtener el ultimo producto ingresado
     getUltimo(vendor_id:string):Observable<any>{
      return this.http.get(this.url +'/productoimagen/'+vendor_id);
    }

    listImgVend(vendor_id:string, product_id:string):Observable<any>{
    return this.http.get(this.url+'/listavendor/'+vendor_id +'/'+ product_id)
    }

}

export interface Product{

}