import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/core/shared/services/users/users.service';
import { Vendor } from 'src/app/core/shared/models/vendor.model';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Product, ProductsService } from 'src/app/core/shared/services/products/products.service';
import { CookiesTokenService } from 'src/app/core/shared/services/cookies-token/cookiestoken.service';
import { HttpClient } from '@angular/common/http';
import { any } from 'underscore';


interface Category {
    value: string;
    viewValue: string;
}

@Component({
    selector: 'app-modalinsertproduct',
    templateUrl: './modal-insertproduct.component.html',
    styleUrls: ['./modal-insertproduct.component.scss']
})


export class InsertproductComponent implements OnInit {
    
    constructor(private cookietoken:CookiesTokenService, private productsService:ProductsService ,private fb: FormBuilder,private http: HttpClient) { }
    ListProduct: Product [ ] | any;
    id_producto: any; 
    images: any = [];
    imgURL = '/assets/images/no-image/insert-img.png';
    multipleImages = [];
    prueba:any = []
    imagenes: any = [];
    public archivos: any =[]
    insertProductForm : FormGroup | any;


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

  ngOnInit() {    
      this.insertProductForm = this.fb.group ({
          vendor_id: this.cookietoken.getUser().vend,
          product_name: ['', Validators.required ],
          description: ['', Validators.required ],
          price: ['', Validators.required ],
          brand: ['', Validators.required ],
          quantity: ['', Validators.required ],
          category: ['', Validators.required ],
          image: ['', Validators.required ],
      });
  }

    insertProduct(){
        this.productsService.insertProduct(this.insertProductForm.value).subscribe(result =>{
            if(!result['insert']){
                Swal.fire({
                    title: 'Error Al Agregar, Intent Nuevamente',
                    icon:'error'
                })
            }
            else{
              const vendor_id = this.cookietoken.getUser().vend;
              this.productsService.getUltimo(vendor_id).subscribe(
                res=>{
                  const formData = new FormData();
                  for (let x = 0; x < this.prueba.length; x++) {
                    formData.append('files', this.prueba[x])
                   }

                console.log(formData)
              
              this.http.post<any>('http://localhost:3000/file', formData).subscribe(
                (res) => console.log(res,  Swal.fire({
                          icon: 'success',
                          title: 'Producto Agregado!',
                          }).then((result) => {
                                      if (result) {
                                                 location.reload();
                                    }
                         }) 
                   ),
                (err) => Swal.fire({
                                icon: 'error',
                                title: 'Oops...',
                                text: 'Parece que no subio nada!!' 
                              })
              );
            },
            err => console.log(err)
          );
             
                Swal.fire({
                    title: 'Producto Agregado!',
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

    //@ts-ignore
  selectImage(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      const reader = new FileReader();
       reader.readAsDataURL(file);
       reader.onload = (event: any)=>{
         this.imgURL = event.target.result;
       }
      this.images = file;
    }
  }
  //@ts-ignore
  selectMultipleImage(event) {
    if (event.target.files.length > 0) {
      this.multipleImages = event.target.files;
      this.prueba = this.multipleImages
    }
  }
 
  //@ts-ignore
  deleteImg (id){ 
        
    Swal.fire({
   icon: 'info',
     title: 'Desea eliminar la imagen?',
   showCancelButton: true,
  confirmButtonText: `Eliminar`,
  }).then((result) => {
  if (result.isConfirmed) {
      this.http.delete<any>(`http://localhost:3000/delete/${id}`).subscribe( res => {
    
    console.log(res, location.reload());

    });
  }
});
  }}