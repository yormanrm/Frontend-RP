import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Address } from 'src/app/core/shared/models/address.model';
import { Vendor } from 'src/app/core/shared/models/vendor.model';
import { CookiesTokenService } from 'src/app/core/shared/services/cookies-token/cookiestoken.service';
import { UsersService } from 'src/app/core/shared/services/users/users.service';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-addresses',
    templateUrl: './addresses.component.html',
    styleUrls: ['./addresses.component.scss']
})

export class AddressesComponent implements OnInit {
    constructor(private userService: UsersService, private fb: FormBuilder, private cookietoken:CookiesTokenService) { }

    currentVendor: Vendor | any;
    addresses: Address | any;
    addressForm : FormGroup | any;
    ngOnInit() { 
        this.loadAddresses();
        this.addressForm = this.fb.group ({
            vendor_id: this.cookietoken.getUser().vend,
            address: ['', Validators.required ]
        });
    }

    loadAddresses(){
        this.userService.getVendor().subscribe(res=>{
            this.currentVendor = res[0];
            this.userService.getVendorAddresses().subscribe(addresses =>this.addresses = addresses)
        });
    }

    registerAddress(){
        this.userService.insertVendorAddress(this.addressForm.value).subscribe(result =>{
            if(!result['insertaddress']){
                Swal.fire({
                    title: 'Error Al Agregar, Intenta Nuevamente',
                    icon:'error'
                })
            }
            else{
                Swal.fire({
                    title: 'Direccion Agregada!',
                    icon:'success'
                }).then(() => {
                    this.reloadPage();
                });
            }
        });
    }

    deleteAddress(address_id : string){
        this.userService.deleteVendorAddress(address_id).subscribe(result =>{
            if(!result['delete']){
                Swal.fire({
                    title: 'Error Intenta De Nuevo',
                    icon:'error'
                })
            }
            else{
                Swal.fire({
                    title: 'Direccion Eliminado',
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