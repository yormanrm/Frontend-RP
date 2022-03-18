import { Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CookiesTokenService } from 'src/app/core/shared/services/cookies-token/cookiestoken.service';
import { UsersService } from 'src/app/core/shared/services/users/users.service';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-editcredentials',
    templateUrl: './editcredentials.component.html',
    styleUrls: ['./editcredentials.component.scss']
})

export class EditcredentialsComponent implements OnInit {

    constructor(private userService: UsersService, private cookietoken: CookiesTokenService, private fb: FormBuilder) { }

    customerCredentialsForm: FormGroup | any;

    ngOnInit() {
        this.customerCredentialsForm = this.fb.group ({
            credential_id: this.cookietoken.getUser().cred,
            passwdOld: ['', Validators.required ],
            passwdNew: ['', Validators.required ],
        });
    }

    updateCredentialsCustomer(){
        this.userService.updateCredentialsCustomer(this.customerCredentialsForm.value).subscribe(result =>{
            if(!result['update']){
                Swal.fire({
                    title: 'No Se Detecto Ningun Cambio O Contraseña Original Incorrecta',
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


    reloadPage(){
        window.location.reload();
    }
}