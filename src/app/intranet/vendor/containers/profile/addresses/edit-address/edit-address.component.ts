import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Address } from 'src/app/core/shared/models/address.model';
import { CookiesTokenService } from 'src/app/core/shared/services/cookies-token/cookiestoken.service';
import { UsersService } from 'src/app/core/shared/services/users/users.service';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-editaddress',
    templateUrl: './edit-address.component.html',
    styleUrls: ['./edit-address.component.scss'],
})

export class EditaddressComponent implements OnInit {
    constructor(private router: Router, private route : ActivatedRoute, private fb: FormBuilder, private userService: UsersService, private cookietoken:CookiesTokenService) { }
    
    addressID : string | any;
    currentAddress: Address | any;
    updateAddressForm: FormGroup | any;

    ngOnInit() { 
        this.addressID = this.route.snapshot.paramMap.get('id');
        this.loadAddress();
        this.updateAddressForm = this.fb.group({
            vendor_id: this.cookietoken.getUser().vend,
            address_id: this.addressID,
            address: ['', Validators.required ],
            default_address: ['', Validators.required ],
        });
    }

    updateAddress(){
        this.userService.updateVendorAddress(this.updateAddressForm.value).subscribe(result =>{
            if(!result['updateaddress']){
                Swal.fire({
                    title: 'No Se Detecto Ningun Cambio',
                    icon:'error'
                })
            }
            else{
                Swal.fire({
                    title: 'Direccion Actualizada!',
                    icon:'success'
                }).then(() => {
                    this.router.navigate(['/account-vendor/editprofile']);
                });
            }
        });
    }

    loadAddress(){
        this.userService.getVendorAddress(this.addressID).subscribe(res =>{
            this.currentAddress = res[0];
        });
    }
    
    reloadPage(){
        window.location.reload();
    }

}