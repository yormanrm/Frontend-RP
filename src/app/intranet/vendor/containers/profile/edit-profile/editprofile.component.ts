import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Vendor } from 'src/app/core/shared/classes/vendor';
import { CookiesTokenService } from 'src/app/core/shared/services/cookies-token/cookiestoken.service';
import { UsersService } from 'src/app/core/shared/services/users/users.service';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-editprofile',
    templateUrl: './editprofile.component.html',
    styleUrls: ['./editprofile.component.scss']
})

export class EditprofileComponent implements OnInit {

    constructor(private userService: UsersService, private cookietoken: CookiesTokenService, private fb: FormBuilder) { }

    currentVendor: Vendor | any;
    vendorInfoForm: FormGroup | any;
    ngOnInit() {
        this.loadCurrentUser();
        this.vendorInfoForm = this.fb.group ({
            vendor_id: this.cookietoken.getUser().vend,
            names: ['', Validators.required ],
            paternal: ['', Validators.required ],
            maternal: ['', Validators.required ],
            phone: ['', Validators.required ],
            gender: ['', Validators.required ]
        });
    }

    updateVendor(){
        this.userService.updateInfoVendor(this.vendorInfoForm.value).subscribe(result =>{
            if(!result['update']){
                Swal.fire({
                    title: 'No Se Detecto Ningun Cambio',
                    icon:'error'
                })
            }
            else{
                Swal.fire({
                    title: 'Datos Actualizados',
                    icon:'success'
                }).then(() => {
                    this.reloadPage();
                });
            }
        });
    }

    loadCurrentUser(){
        this.userService.getVendor().subscribe(res=>{
            this.currentVendor = res[0];
        });
    }

    reloadPage(){
        window.location.reload();
    }
}