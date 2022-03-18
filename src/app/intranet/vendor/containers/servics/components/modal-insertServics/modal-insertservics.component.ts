import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductsService } from 'src/app/core/shared/services/products/products.service';
import { CookiesTokenService } from 'src/app/core/shared/services/cookies-token/cookiestoken.service';
import { ServicsService } from 'src/app/core/shared/services/servics/servics.service';
import { HttpClient } from '@angular/common/http';


interface Category {
    value: string;
    viewValue: string;
}

@Component({
    selector: 'app-modalinsertservics',
    templateUrl: './modal-insertservics.component.html',
    styleUrls: ['./modal-insertservics.component.scss']
})


export class InsertservicsComponent implements OnInit {
    
    constructor(private cookietoken:CookiesTokenService, private servicsService:ServicsService ,private fb: FormBuilder, private http: HttpClient) { }
    prueba:any = []
    imagenes: any = [];
    insertServiceForm : FormGroup | any;
    images: any = [];
    multipleImages = [];
    imgURL = '/assets/images/no-image/insert-img.png';



    categories: Category[] = [
        {value: 'Arquitectura e Ingenieria', viewValue: 'Arquitectura e Ingeniería'},
        {value: 'Audiovisual', viewValue: 'Audiovisual'},
        {value: 'Comunicacion', viewValue: 'Comunicacion'},
        {value: 'Contabilidad', viewValue: 'Contabilidad'},
        {value: 'Distribucion', viewValue: 'Distribucion'},
        {value: 'Enseñanza', viewValue: 'Enseñanza'},
        {value: 'Energia', viewValue: 'Energia'},
        {value: 'Financiero', viewValue: 'Financiero'},
        {value: 'Informatica y Computacion', viewValue: 'Informatica y Computacion'},
        {value: 'Juridico', viewValue: 'Juridico'},
        {value: 'Logistico', viewValue: 'Logistico'},
        {value: 'Mantenimiento', viewValue: 'Mantenimiento'},
        {value: 'Postal y Mensajeria', viewValue: 'Postal y Mensajeria'},
        {value: 'Reparacion', viewValue: 'Reparacion'},
        {value: 'Turismo', viewValue: 'Turismo'},
        {value: 'Transporte', viewValue: 'Transporte'},
        {value: 'Social', viewValue: 'Social'},
        {value: 'Salud', viewValue: 'Salud'},
        {value: 'Otros', viewValue: 'Otros'},
    ];

    ngOnInit() {    
        this.insertServiceForm = this.fb.group ({
            vendor_id: this.cookietoken.getUser().vend,
            service_name: ['', Validators.required ],
            description: ['', Validators.required ],
            minprice: ['', Validators.required ],
            maxprice: ['', Validators.required ],
            category: ['', Validators.required ],
        });
    }

    

    insertService(){
        this.servicsService.insertService(this.insertServiceForm.value).subscribe(result =>{
            if(!result['insert']){
                Swal.fire({
                    title: 'Error Al Agregar, Intente Nuevamente',
                    icon:'error'
                })
            }
            else{
                const vendor_id = this.cookietoken.getUser().vend;
                this.servicsService.getUltimo(vendor_id).subscribe(
                    res=>{
                        const formData = new FormData();
                        for (let x = 0; x < this.prueba.length; x++) {
                            formData.append('files', this.prueba[x])
                           }
                           this.http.post<any>('http://localhost:3000/fileserv', formData).subscribe(
                            (res) => console.log(res,  Swal.fire({ 
                                icon: 'success',
                                title: 'Servicio Agregado!',
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
                    title: 'Servicio Agregado!',
                    icon:'success'
                }).then(() => {     //finaliza swal
                    this.reloadPage();
                });// finaliza then 
            }// finializa else
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


}