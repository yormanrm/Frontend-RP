import { HttpClient } from '@angular/common/http';
import { Component, Directive, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Business } from 'src/app/core/shared/models/business.model';
import { Vendor } from 'src/app/core/shared/models/vendor.model';
import { CookiesTokenService } from 'src/app/core/shared/services/cookies-token/cookiestoken.service';
import { UsersService } from 'src/app/core/shared/services/users/users.service';
import Swal from 'sweetalert2';


@Component({
    selector: 'app-editbusiness',
    templateUrl: './edit-business.component.html',
    styleUrls: ['./edit-business.component.scss']
})



export class EditbusinessComponent implements OnInit {


    constructor(private fb:FormBuilder, private userService: UsersService, private cookietoken: CookiesTokenService, private http: HttpClient) { }

    currentVendor: Vendor | any;
    currentBusiness: Business | any;
    businessInfoForm : FormGroup | any;

    images: any = [];
    imgURL = '/assets/images/no-image/insert-img.png';
    multipleImages = [];
    prueba:any = []
    imagenes: any = [];


    ngOnInit() {
        this.loadCurrentBusiness()
        this.businessInfoForm = this.fb.group({
            vendor_id: this.cookietoken.getUser().vend,
            name: ['', Validators.required ],
            address: ['', Validators.required ],
            about: ['', Validators.required ],
            phone: ['', Validators.required ],
            email: ['', Validators.required ],
            image: ['', Validators.required ],
        });
    }


    updateBusiness(){
        this.userService.updateInfoBusiness(this.businessInfoForm.value).subscribe(result =>{
            if(!result['updatebusiness']){
                Swal.fire({
                    title: 'No Se Detecto Ningun Cambio',
                    icon:'error'
                })
            }
            else{
                this.userService.getUltimoBus(this.cookietoken.getUser().vend).subscribe(
                  res=>{
                    const formData = new FormData();
                    for (let x = 0; x < this.prueba.length; x++) {
                      formData.append('files', this.prueba[x])
                     }
  
                  console.log(formData)
                
                this.http.post<any>('http://localhost:3000/filebus', formData).subscribe(
                  (res) => console.log(res,  Swal.fire({
                            icon: 'success',
                            title: 'Datos Empresariales Actualizados',
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
                    title: 'Datos Empresariales Actualizados',
                    icon:'success'
                }).then(() => {
                    this.reloadPage();
                });
            }
        });
    }


    loadCurrentBusiness(){
        this.userService.getBusiness().subscribe(business => {
        this.currentBusiness = business[0];
        const reader = new FileReader();
        reader.onload =(this.currentVendor);
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
  }


}